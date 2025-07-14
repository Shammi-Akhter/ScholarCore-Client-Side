import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast, { Toaster } from 'react-hot-toast';
import ApplicationModal from './ApplicationModal'; 
import { AuthContext } from '../context/AuthContext';

const stripePromise = loadStripe('pk_test_VITE_STRIPE_PUBLISHABLE_KEY'); 

function CheckoutForm({ amount, scholarshipId, setShowModal }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/create-payment-intent', {
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
        console.log('Payment succeeded!');
        toast.success('Payment successful! You can now apply for the scholarship.');
        setShowModal(true);
      }
    } catch (err) {
      toast.error('Payment failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-amber-100">
        <h2 className="text-3xl font-bold mb-4 text-center text-amber-500">Checkout</h2>
        <div className="mb-4 text-center">
          <p className="text-gray-700 mb-1">Scholarship ID:</p>
          <div className="font-semibold text-lg text-gray-900 mb-2 bg-gray-50 rounded px-2 py-1 inline-block">{scholarshipId}</div>
          <p className="text-gray-700 mb-1">Application Fee:</p>
          <div className="font-semibold text-xl text-amber-600 mb-2">${amount}</div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <CardElement className="p-2 rounded border border-gray-300 bg-white" />
          </div>
          <button type="submit" disabled={!stripe || loading} className="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 rounded-full shadow transition-all duration-200">
            {loading ? 'Processing...' : 'Pay & Apply'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Checkout() {
  const { id: scholarshipId } = useParams();
  const location = useLocation();
  const amount = location.state?.amount || 0;
  const [showModal, setShowModal] = useState(false);
  const [scholarship, setScholarship] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchScholarship() {
      try {
        const res = await fetch(`http://localhost:5000/scholarships/${scholarshipId}`);
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
        <CheckoutForm amount={amount} scholarshipId={scholarshipId} setShowModal={setShowModal} />
      </Elements>
      <ApplicationModal
        open={showModal && !!scholarship.universityName}
        onClose={() => setShowModal(false)}
        scholarship={scholarship}
        user={user}
        scholarshipId={scholarshipId}
        onSubmit={() => setShowModal(false)}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
} 