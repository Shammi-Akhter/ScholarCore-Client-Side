import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

const ITEMS_PER_PAGE = 9;

const AllScholarship = () => {
    const [allScholarships, setAllScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch('https://scholarcore.vercel.app/scholarships')
            .then(res => res.json())
            .then(data => {
                setAllScholarships(data);
                setFiltered(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching scholarships:', err);
                setLoading(false);
            });
    }, []);

    // Search handler
    const handleSearch = (e) => {
        e.preventDefault();
        if (!search.trim()) {
            setFiltered(allScholarships);
            setCurrentPage(1);
            return;
        }
        const query = search.toLowerCase();
        const filteredList = allScholarships.filter(scholar =>
            (scholar.scholarshipName && scholar.scholarshipName.toLowerCase().includes(query)) ||
            (scholar.universityName && scholar.universityName.toLowerCase().includes(query)) ||
            (scholar.degreeName && scholar.degreeName.toLowerCase().includes(query))
        );
        setFiltered(filteredList);
        setCurrentPage(1);
    };

    // Pagination logic
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentScholarships = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    if (loading) return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;

    return (
        <div className="px-2 sm:px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">All Scholarships</h2>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search by Scholarship, University, or Degree Name"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full md:w-96 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-amber-400 text-white font-semibold rounded-lg hover:bg-amber-500 transition"
                >
                    Search
                </button>
            </form>

            {/* Scholarships Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentScholarships.length === 0 ? (
                    <p className="col-span-3 text-center text-gray-500">No scholarships found.</p>
                ) : (
                    currentScholarships.map((scholar, index) => (
                        <div
                            key={scholar._id ? scholar._id.toString() : index}
                            className="bg-white border border-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                        >
                            {/* University Logo */}
                            {scholar.universityLogo && (
                                <img
                                    src={scholar.universityLogo}
                                    alt={`${scholar.universityName} logo`}
                                    className="w-full h-48 object-cover"
                                />
                            )}

                            {/* Content */}
                            <div className="p-5 space-y-2">
                                <h3 className="text-xl font-semibold  text-gray-800">{scholar.universityName || 'University Name'}</h3>
                                <p className="text-sm text-gray-700">
                                    <strong>Category:</strong> {scholar.scholarshipCategory || 'N/A'}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>Location:</strong> {scholar.location || 'N/A'}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>Deadline:</strong> {scholar.applicationDeadline || 'Not specified'} 
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>Subjects:</strong> {scholar.subjectCategory || 'N/A'}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>Application Fee:</strong> ${scholar.applicationFees || 'Free'}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-yellow-500">
                                    <strong>Rating:</strong>
                                    <span className="text-gray-700">
                                        {scholar.rating ? `${scholar.rating} / 5` : 'No rating'}
                                    </span>
                                </div>

                                <NavLink to={`/scholarship-details/${scholar._id}`}>
                                    <button
                                        className="mt-3 w-2/3 bg-amber-200  text-gray-900 font-medium py-2 rounded-full hover:bg-amber-300 transition"
                                    >
                                        scholar Details
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-10 gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-amber-400 text-white hover:bg-amber-500'}`}
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-amber-200'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-amber-400 text-white hover:bg-amber-500'}`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllScholarship;
