import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  GraduationCap,
  MapPin,
  Calendar,
  DollarSign,
  BookOpen,
  FileText,
  Star,
  User,
  ArrowLeft,
  Send
} from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const ScholarshipDetails = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://scholarcore.vercel.app/scholarships/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setScholarship(data);
        setLoading(false);
      });

    fetch(`https://scholarcore.vercel.app/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);

  if (loading || !scholarship)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FEE685] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Loading scholarship details...</p>
        </div>
      </div>
    );

  const filteredReviews = reviews.filter((r) => r.scholarshipId === id);

  const sliderSettings = {
    dots: filteredReviews.length > 2,
    infinite: filteredReviews.length > 2,
    speed: 500,
    slidesToShow: Math.min(2, filteredReviews.length),
    slidesToScroll: 1,
    autoplay: filteredReviews.length > 2,
    arrows: filteredReviews.length > 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <style>{`
        .slick-track {
          display: flex !important;
        }
        .slick-slide {
          height: inherit !important;
          display: flex !important;
        }
        .slick-slide > div {
          height: 100%;
          display: flex;
        }
      `}</style>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Main Card */}
        <Card className="shadow-2xl overflow-hidden mb-8">
          {scholarship.universityLogo && (
            <div className="relative h-96 overflow-hidden">
              <img
                src={scholarship.universityLogo}
                alt="University"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <Badge className="mb-3 bg-black text-white">
                  {scholarship.scholarshipCategory}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {scholarship.universityName}
                </h1>
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{scholarship.location}</span>
                </div>
              </div>
            </div>
          )}

          <CardContent className="p-8">
            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Application Deadline</p>
                  <p className="font-semibold text-lg">{scholarship.applicationDeadline}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Application Fee</p>
                  <p className="font-semibold text-lg">${scholarship.applicationFees || 'Free'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Subject Category</p>
                  <p className="font-semibold text-lg">{scholarship.subjectCategory}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Service Charge</p>
                  <p className="font-semibold text-lg">{scholarship.serviceCharge || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="w-6 h-6" />
                Scholarship Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {scholarship.scholarshipDescription || 'Awarded to outstanding students demonstrating academic excellence.'}
              </p>
            </div>

            {/* Apply Button */}
            <Button
              onClick={() =>
                navigate(`/checkout/${id}`, {
                  state: { amount: scholarship.applicationFees },
                })
              }
              size="lg"
              className="w-full md:w-auto bg-[#FEE685] text-black hover:bg-[#FEE685]/90 font-semibold shadow-lg px-12"
            >
              <Send className="w-5 h-5 mr-2" />
              Apply for Scholarship
            </Button>
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Star className="w-7 h-7 text-[#FEE685] fill-[#FEE685]" />
              User Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredReviews.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">No reviews yet. Be the first to review!</p>
              </div>
            ) : (
              <Slider {...sliderSettings}>
                {filteredReviews.map((review, index) => (
                  <div key={index} className="px-3 h-full">
                    <Card className="shadow-md hover:shadow-lg transition-shadow h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-6 h-6 text-black" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{review.reviewerName}</h4>
                            <p className="text-sm text-gray-500">{review.reviewDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${i < review.rating
                                ? 'text-[#FEE685] fill-[#FEE685]'
                                : 'text-gray-300'
                                }`}
                            />
                          ))}
                          <span className="ml-2 font-semibold">{review.rating} / 5</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed flex-1">{review.comment}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </Slider>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
