import React, { useEffect, useState } from 'react';

const AllScholarship = () => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/scholarships')
            .then(res => res.json())
            .then(data => {
                setScholarships(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching scholarships:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">All Scholarships</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {scholarships.map((scholarship, index) => (
                    <div
                        key={scholarship._id ? scholarship._id.toString() : index}
                        className="bg-white border border-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                    >
                        {/* University Logo */}
                        {scholarship.image && (
                            <img
                                src={scholarship.image}
                                alt={`${scholarship.universityName} logo`}
                                className="w-full h-48 object-cover"
                            />
                        )}

                        {/* Content */}
                        <div className="p-5 space-y-2">
                            <h3 className="text-xl font-semibold text-center text-gray-800">{scholarship.universityName || 'University Name'}</h3>
                            <p className="text-sm text-gray-700">
                                <strong>Category:</strong> {scholarship.scholarshipCategory || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700">
                                <strong>Location:</strong> {scholarship.location || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700">
                                <strong>Deadline:</strong> {scholarship.
applicationDeadline || 'Not specified'}
                            </p>
                            <p className="text-sm text-gray-700">
                                <strong>Subjects:</strong> {scholarship.subjectCategory || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700">
                                <strong>Application Fee:</strong> ${scholarship.
applicationFees|| 'Free'}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-yellow-500">
                                <strong>Rating:</strong>
                                <span className="text-gray-700">
                                    {scholarship.rating ? `${scholarship.rating} / 5` : 'No rating'}
                                </span>
                            </div>

                            <button
                                className="mt-3 w-2/3 bg-amber-200 border-1 text-gray-900 font-medium py-2 rounded-full cursor-pointer hover:bg-amber-300 transition"
                                onClick={() => alert(`Details coming for ${scholarship.universityName}`)}
                            >
                                Scholarship Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllScholarship;
