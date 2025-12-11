import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { Search, Eye } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

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


    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentScholarships = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#FEE685] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg font-medium text-gray-600">Loading scholarships...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-black mb-4">All Scholarships</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover opportunities to fund your education and achieve your dreams
                    </p>
                </div>


                <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 max-w-3xl mx-auto">
                    <div className="relative w-full">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="Search by scholarship, university, or degree name..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="pl-12 h-12 text-base shadow-sm"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="bg-[#FEE685] text-black hover:bg-[#FEE685]/90 font-semibold h-12 px-8 shadow-sm whitespace-nowrap"
                    >
                        <Search className="w-4 h-4 mr-2" />
                        Search
                    </Button>
                </form>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentScholarships.length === 0 ? (
                        <div className="col-span-3 text-center py-16">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-12 h-12 text-gray-400" />
                            </div>
                            <p className="text-gray-500 text-lg">No scholarships found matching your search.</p>
                        </div>
                    ) : (
                        currentScholarships.map((scholar, index) => (
                            <Card key={scholar._id ? scholar._id.toString() : index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden group">
                                {scholar.universityLogo && (
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={scholar.universityLogo}
                                            alt={`${scholar.universityName} logo`}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <Badge className="bg-black text-white shadow-lg">
                                                {scholar.scholarshipCategory || 'Scholarship'}
                                            </Badge>
                                        </div>
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="text-xl line-clamp-1">{scholar.universityName || 'University Name'}</CardTitle>
                                    <CardDescription className="text-sm">{scholar.location || 'Location not specified'}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Deadline:</span>
                                        <span className="font-medium">{scholar.applicationDeadline || 'Not specified'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Subject:</span>
                                        <span className="font-medium line-clamp-1">{scholar.subjectCategory || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Fee:</span>
                                        <span className="font-semibold text-black">${scholar.applicationFees || 'Free'}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t">
                                        <span className="text-gray-600">Rating:</span>
                                        <Badge className="bg-black text-white">
                                            ⭐ {scholar.rating ? `${scholar.rating} / 5` : 'No rating'}
                                        </Badge>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <NavLink to={`/scholarship-details/${scholar._id}`} className="w-full">
                                        <Button className="w-full bg-[#FEE685] text-black hover:bg-[#FEE685]/90 font-semibold shadow-sm group-hover:shadow-md transition-shadow">
                                            <Eye className="w-4 h-4 mr-2" />
                                            View Details
                                        </Button>
                                    </NavLink>
                                </CardFooter>
                            </Card>
                        ))
                    )}
                </div>


                {totalPages > 1 && (
                    <div className="flex justify-center mt-12 gap-2 flex-wrap">
                        <Button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            variant="outline"
                            className={`shadow-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                        >
                            Previous
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                variant={currentPage === i + 1 ? 'default' : 'outline'}
                                className={currentPage === i + 1 ? 'bg-[#FEE685] text-black hover:bg-[#FEE685]/90 shadow-sm' : 'hover:bg-gray-100 shadow-sm'}
                            >
                                {i + 1}
                            </Button>
                        ))}
                        <Button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            variant="outline"
                            className={`shadow-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllScholarship;
