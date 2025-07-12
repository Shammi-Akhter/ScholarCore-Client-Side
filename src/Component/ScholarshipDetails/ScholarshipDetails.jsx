import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ScholarshipDetails = () => {
    const { id } = useParams();
    const [scholarship, setScholarship] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/scholarships/${id}`)
            .then(res => res.json())
            .then(data => {
                setScholarship(data);
                setLoading(false);
            });

        fetch(`http://localhost:5000/reviews/${id}`)
            .then(res => res.json())
            .then(data => setReviews(data));
    }, [id]);

    if (loading || !scholarship) return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
                {scholarship.image && (
                    <img src={scholarship.image} alt="University Logo" className="w-full h-64 object-cover" />
                )}
                <div className="p-6">
                    <h2 className="text-3xl font-bold text-blue-800 mb-3">{scholarship.universityName}</h2>
                    <p><strong>Category:</strong> {scholarship.category}</p>
                    <p><strong>Location:</strong> {scholarship.location}</p>
                    <p><strong>Deadline:</strong> {scholarship.deadline}</p>
                    <p><strong>Subject:</strong> {scholarship.subjectCategory}</p>
                    <p><strong>Description:</strong> {scholarship.description || 'N/A'}</p>
                    <p><strong>Stipend:</strong> {scholarship.stipend || 'Not specified'}</p>
                    <p><strong>Post Date:</strong> {scholarship.postDate || 'N/A'}</p>
                    <p><strong>Service Charge:</strong> {scholarship.serviceCharge || 'N/A'}</p>
                    <p><strong>Application Fee:</strong> {scholarship.applicationFee || 'Free'}</p>

                    <button
                        className="mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
                        onClick={() => alert('Redirecting to scholarship application...')}
                    >
                        Apply Scholarship
                    </button>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">User Reviews</h3>

                {reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews available for this scholarship.</p>
                ) : (
                    <Slider {...sliderSettings}>
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 rounded-lg p-6 shadow mb-4"
                            >
                                <div className="flex items-center mb-4">
                                    <img
                                        src={review.reviewerImage}
                                        alt="Reviewer"
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <p className="font-semibold">{review.reviewerName}</p>
                                        <p className="text-sm text-gray-500">{review.reviewDate}</p>
                                    </div>
                                </div>
                                <div className="text-yellow-500 mb-2">
                                    Rating: {review.rating} / 5
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        ))}
                    </Slider>
                )}
            </div>
        </div>
    );
};

export default ScholarshipDetails;
