import React, { useState, useEffect, useContext, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, DollarSign, FileText, ArrowLeft, Send } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import ApplicationModal from './ApplicationModal';
import { AuthContext } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ amount, scholarshipId, scholarship, user }) {
  const stripe = useStripe();
  const elements = useElements();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cardSectionRef = useRef();

  // Step 1: Show modal on button click
  const handlePayAndApply = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  // Step 2: On modal submit, process payment
  const handleApplicationSubmit = async () => {
    setShowModal(false);
    setLoading(true);
    try {
      const res = await fetch('https://scholarcore.vercel.app/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(Number(amount) * 100) }),
      });
      const { clientSecret, error } = await res.json();
      if (error) {
        toast.error(error);
        setLoading(false);
        return;
      }
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        toast.success('Payment successful! Application submitted.');
        // Redirect to all-scholarship page after 2 seconds
        setTimeout(() => {
          navigate('/all-scholarship');
        }, 2000);
      }
    } catch {
      toast.error('Payment failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CreditCard className="w-8 h-8 text-black" />
            </div>
            <CardTitle className="text-3xl font-bold">Checkout</CardTitle>
            <p className="text-gray-600 mt-2">Complete your scholarship application payment</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Scholarship Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-black" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Scholarship ID</p>
                  <p className="font-mono text-sm font-semibold break-all">{scholarshipId}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-black" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Application Fee</p>
                  <p className="text-2xl font-bold text-black">${amount}</p>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handlePayAndApply} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Details
                </label>
                <div className="bg-white rounded-lg p-4 shadow-sm" ref={cardSectionRef}>
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#000',
                          '::placeholder': {
                            color: '#9ca3af',
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || !stripe}
                className="w-full bg-[#FEE685] text-black hover:bg-[#FEE685]/90 font-semibold h-12 shadow-md hover:shadow-lg transition-all"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Pay & Apply
                  </>
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="text-center text-sm text-gray-500 pt-4 border-t">
              <p>🔒 Your payment is secure and encrypted</p>
            </div>
          </CardContent>
        </Card>

        {/* Application Modal */}
        <ApplicationModal
          open={showModal && !!scholarship.universityName}
          onClose={() => setShowModal(false)}
          scholarship={scholarship}
          user={user}
          scholarshipId={scholarshipId}
          onSubmit={handleApplicationSubmit}
        />
      </div>
    </div>
  );
}


export default function Checkout() {
  const { id: scholarshipId } = useParams();
  const location = useLocation();
  const amount = location.state?.amount || 0;
  const [scholarship, setScholarship] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchScholarship() {
      try {
        const res = await fetch(`https://scholarcore.vercel.app/scholarships/${scholarshipId}`);
        const data = await res.json();
        setScholarship(data);
      } catch {
        setScholarship({});
      }
    }
    fetchScholarship();
  }, [scholarshipId]);

  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount} scholarshipId={scholarshipId} scholarship={scholarship} user={user} />
      </Elements>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}