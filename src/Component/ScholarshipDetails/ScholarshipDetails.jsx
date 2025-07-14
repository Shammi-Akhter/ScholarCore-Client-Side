import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;

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
        breakpoint: 768, // for mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Scholarship Info Card */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
        {scholarship.universityLogo && (
          <img
            src={scholarship.universityLogo}
            alt="University Logo"
            className="w-full h-96 object-fill"
          />
        )}
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{scholarship.universityName}</h2>
          <p><strong>Category:</strong> {scholarship.scholarshipCategory}</p>
          <p><strong>Location:</strong> {scholarship.location}</p>
          <p><strong>Deadline:</strong> {scholarship.applicationDeadline}</p>
          <p><strong>Subject:</strong> {scholarship.subjectCategory}</p>
          <p><strong>Description:</strong> {scholarship.scholarshipDescription || 'N/A'}</p>
          <p><strong>Post Date:</strong> {scholarship.postDate || 'N/A'}</p>
          <p><strong>Service Charge:</strong> {scholarship.serviceCharge || 'N/A'}</p>
          <p><strong>Application Fee:</strong> ${scholarship.applicationFees || 'Free'}</p>

          <button
            className="mt-6 bg-amber-200 text-gray-900 px-6 py-3 rounded-full hover:bg-amber-300 transition"
            onClick={() =>
              navigate(`/checkout/${id}`, {
                state: { amount: scholarship.applicationFees },
              })
            }
          >
            Apply Scholarship
          </button>
        </div>
      </div>

      {/* Review Section */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">User Reviews</h3>

        {filteredReviews.length === 0 ? (
          <p className="text-gray-500">This scholarship has no reviews.</p>
        ) : filteredReviews.length === 1 ? (
          <div className="bg-gray-100 rounded-lg p-6 shadow mb-4">
            <div className="flex items-center mb-4">
              <img
                src={filteredReviews[0].userImage}
                alt="Reviewer"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">{filteredReviews[0].userName}</p>
                <p className="text-sm text-gray-500">{filteredReviews[0].reviewDate}</p>
              </div>
            </div>
            <div className="text-yellow-500 mb-2">
              Rating: {filteredReviews[0].rating} / 5
            </div>
            <p className="text-gray-700">{filteredReviews[0].comment}</p>
          </div>
        ) : (
            <Slider {...sliderSettings} className="-mx-2">
            {filteredReviews.map((review, index) => (
              <div key={index} className="px-2">
                <div className="bg-gray-100 rounded-lg p-6 shadow mb-4 h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={review.userImage}
                      alt="Reviewer"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold">{review.userName}</p>
                      <p className="text-sm text-gray-500">{review.reviewDate}</p>
                    </div>
                  </div>
                  <div className="text-yellow-500 mb-2">
                    Rating: {review.rating} / 5
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              </div>
            ))}
          </Slider>
          
        )}
      </div>
    </div>
  );
};

export default ScholarshipDetails;
