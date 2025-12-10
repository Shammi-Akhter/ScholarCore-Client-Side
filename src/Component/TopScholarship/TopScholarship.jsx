import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { Star, GraduationCap, MapPin, Calendar, DollarSign, Eye } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const TopScholarship = () => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://scholarcore.vercel.app/scholarships')
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
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="py-16 flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#FEE685] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg font-medium text-gray-600">Loading top scholarships...</p>
            </div>
        </div>
    );

    return (
        <div className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Star className="w-8 h-8 text-[#FEE685] fill-[#FEE685]" />
                        <h2 className="text-5xl font-bold text-black">Top Scholarships</h2>
                    </div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Explore our highest-rated scholarship opportunities
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {scholarships.map((scholarship, index) => (
                        <Card key={scholarship._id ? scholarship._id.toString() : index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                            {scholarship.universityLogo && (
                                <div className="relative overflow-hidden h-48">
                                    <img
                                        src={scholarship.universityLogo}
                                        alt={`${scholarship.universityName} logo`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute top-3 right-3">
                                        <Badge className="bg-black text-white shadow-lg font-semibold">
                                            {scholarship.scholarshipCategory || 'Scholarship'}
                                        </Badge>
                                    </div>
                                    <div className="absolute bottom-3 left-3 flex items-center gap-1">
                                        <Star className="w-5 h-5 text-[#FEE685] fill-[#FEE685]" />
                                        <span className="text-white font-bold text-lg">{scholarship.rating}</span>
                                        <span className="text-white/80 text-sm">/ 5</span>
                                    </div>
                                </div>
                            )}

                            <CardHeader className="pb-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                                        <GraduationCap className="w-5 h-5 text-black" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <CardTitle className="text-lg line-clamp-2 leading-tight">
                                            {scholarship.universityName || 'University Name'}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-1 mt-1">
                                            <MapPin className="w-3 h-3" />
                                            <span className="text-xs">{scholarship.location || 'Location'}</span>
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-3 text-sm pb-4">
                                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-xs">Deadline</span>
                                    </div>
                                    <span className="font-medium text-xs">{scholarship.applicationDeadline || 'Not specified'}</span>
                                </div>

                                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <DollarSign className="w-4 h-4" />
                                        <span className="text-xs">Application Fee</span>
                                    </div>
                                    <span className="font-semibold text-black text-xs">
                                        ${scholarship.applicationFees || 'Free'}
                                    </span>
                                </div>

                                {scholarship.subjectCategory && (
                                    <div className="pt-2">
                                        <Badge variant="secondary" className="text-xs">
                                            {scholarship.subjectCategory}
                                        </Badge>
                                    </div>
                                )}
                            </CardContent>

                            <CardFooter className="pt-0">
                                <NavLink to={`/scholarship-details/${scholarship._id}`} className="w-full">
                                    <Button className="w-full bg-[#FEE685] text-black hover:bg-[#FEE685]/90 font-semibold shadow-md group-hover:shadow-lg transition-all">
                                        <Eye className="w-4 h-4 mr-2" />
                                        View Details
                                    </Button>
                                </NavLink>
                            </CardFooter>
                        </Card>
                    ))}
                </div>


                <div className="mt-12 flex justify-center">
                    <Button
                        onClick={() => navigate('/all-scholarship')}
                        size="lg"
                        className="bg-black text-white hover:bg-black/90 font-semibold shadow-lg px-8"
                    >
                        View All Scholarships
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TopScholarship;
