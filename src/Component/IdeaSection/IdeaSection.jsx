import React from 'react';
import { Sparkles, BookOpen, Target } from 'lucide-react';
import { Card } from '../../components/ui/card';

const IdeaSection = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Watermark Title */}
                <div className="text-center mb-16">
                    <p className="text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-b from-gray-300 to-gray-100 bg-clip-text text-transparent mb-4">
                        Follow your passion
                    </p>
                </div>

                {/* Content Section */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Text Content */}
                    <div className="lg:w-1/2 space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FEE685]/20 rounded-full">
                            <Sparkles className="w-5 h-5 text-black" />
                            <span className="text-sm font-semibold text-black">Empower Your Journey</span>
                        </div>

                        <h3 className="text-4xl md:text-5xl font-bold text-black leading-tight">
                            Learn What You Love
                        </h3>

                        <p className="text-gray-700 text-lg leading-relaxed">
                            Discover a world where education meets inspiration. Our Scholar Management System is designed to help you follow your passion, choose the subjects that spark your curiosity, and connect with mentors who fuel your growth.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 pt-4">
                            <Card className="p-4 border-0 shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <BookOpen className="w-5 h-5 text-black" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-black mb-1">Personalized Learning</h4>
                                        <p className="text-sm text-gray-600">Choose subjects that match your interests</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-4 border-0 shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Target className="w-5 h-5 text-black" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-black mb-1">Achieve Your Goals</h4>
                                        <p className="text-sm text-gray-600">Turn ambition into achievement</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Images Section */}
                    <div className="lg:w-1/2 relative h-[400px] w-full">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img
                                src="https://i.postimg.cc/qRVTmFwj/idea3.jpg"
                                alt="Student learning"
                                className="absolute top-0 left-0 w-64 h-64 object-cover rounded-2xl shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-300"
                            />

                            <img
                                src="https://i.postimg.cc/MTz7bPyQ/idea2.webp"
                                alt="Education"
                                className="absolute top-16 left-1/2 -translate-x-1/2 w-72 h-72 object-cover rounded-2xl shadow-2xl z-10 hover:scale-105 transition-transform duration-300"
                            />

                            <img
                                src="https://i.postimg.cc/xT00DW2Z/idea1.jpg"
                                alt="Success"
                                className="absolute top-0 right-0 w-64 h-64 object-cover rounded-2xl shadow-xl transform rotate-6 hover:rotate-0 transition-transform duration-300"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IdeaSection;