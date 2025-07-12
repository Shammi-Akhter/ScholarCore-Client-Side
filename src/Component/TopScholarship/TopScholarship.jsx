import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router'; // for navigation (if needed)

const TopScholarship = () => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/scholarships')
            .then(res => res.json())
            .then(data => {
                const topRated = data
                    .filter(item => item.rating && item.rating >= 4.5)
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 6);
                setScholarships(topRated);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching scholarships:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;

    return (
        <div className="container mx-auto px-4 ">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Top Scholarships</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {scholarships.map((scholarship, index) => (
                    <div
                        key={scholarship._id ? scholarship._id.toString() : index}
                        className="bg-white border rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                    >
                        {scholarship.image && (
                            <img
                                src={scholarship.image}
                                alt={`${scholarship.universityName} logo`}
                                className="w-full h-48 object-cover"
                            />
                        )}

                        <div className="p-5 space-y-2">
                            <h3 className="text-xl font-semibold  text-gray-800">{scholarship.universityName || 'University Name'}</h3>
                            <p className="text-sm  text-gray-900">
                                <strong>Category:</strong> {scholarship.scholarshipCategory || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-900">
                                <strong>Location:</strong> {scholarship.location || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-900">
                                <strong>Deadline:</strong> {scholarship.
                                    applicationDeadline || 'Not specified'}
                            </p>
                            <p className="text-sm text-gray-900">
                                <strong>Subjects:</strong> {scholarship.subjectCategory || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-900">
                                <strong>Application Fee:</strong>$ {scholarship.
                                    applicationFees || 'Free'}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-yellow-500">
                                <strong>Rating:</strong>
                                <span className="text-gray-900">
                                    {scholarship.rating ? `${scholarship.rating} / 5` : 'No rating'}
                                </span>
                            </div>

                            <NavLink to={`/scholarship-details/${scholarship._id}`}>
                                <button
                                    className="mt-3 w-2/3 bg-amber-200  text-gray-900 font-medium py-2 rounded-full hover:bg-amber-300 transition"

                                >
                                    Scholarship Details
                                </button>
                            </NavLink>
                        </div>
                    </div>
                ))}
            </div>

            {/* All Scholarships Button */}
            <div className="mt-10 flex justify-center">
                <button
                    className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-semibold"
                    onClick={() => navigate('/all-scholarship')} // change route as needed
                >
                    View All Scholarships
                </button>
            </div>
        </div>
    );
};

export default TopScholarship;
