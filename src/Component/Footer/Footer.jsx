import React from 'react';
import { NavLink } from 'react-router';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white text-gray-700 border-t border-gray-200">
            <div className="container mx-auto px-4 max-w-7xl py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-6 h-6 text-black" />
                            </div>
                            <h3 className="text-2xl font-bold text-black">ScholarCore</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Empowering students worldwide to achieve their academic dreams through accessible scholarship opportunities.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-black font-semibold mb-4 text-lg">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <NavLink
                                    to="/"
                                    className="text-gray-600 hover:text-black transition-colors text-sm font-medium"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/all-scholarship"
                                    className="text-gray-600 hover:text-black transition-colors text-sm font-medium"
                                >
                                    All Scholarships
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about-us"
                                    className="text-gray-600 hover:text-black transition-colors text-sm font-medium"
                                >
                                    About Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className="text-gray-600 hover:text-black transition-colors text-sm font-medium"
                                >
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-black font-semibold mb-4 text-lg">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm">
                                <Mail className="w-4 h-4 mt-0.5 text-black flex-shrink-0" />
                                <span className="text-gray-600">support@scholarcore.com</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                                <Phone className="w-4 h-4 mt-0.5 text-black flex-shrink-0" />
                                <span className="text-gray-600">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                                <MapPin className="w-4 h-4 mt-0.5 text-black flex-shrink-0" />
                                <span className="text-gray-600">123 Education Street, Learning City, ED 12345</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="text-black font-semibold mb-4 text-lg">Follow Us</h4>
                        <div className="flex gap-3">
                            <a
                                href="https://twitter.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-100 hover:bg-[#FEE685] rounded-lg flex items-center justify-center transition-all group"
                            >
                                <Twitter className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" />
                            </a>
                            <a
                                href="https://youtube.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-100 hover:bg-[#FEE685] rounded-lg flex items-center justify-center transition-all group"
                            >
                                <Youtube className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" />
                            </a>
                            <a
                                href="https://facebook.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-100 hover:bg-[#FEE685] rounded-lg flex items-center justify-center transition-all group"
                            >
                                <Facebook className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" />
                            </a>
                        </div>
                        <p className="text-xs text-gray-500 mt-4">
                            Stay connected for the latest scholarship updates and opportunities.
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-600">
                            © {new Date().getFullYear()} ScholarCore. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-gray-600 hover:text-black transition-colors font-medium">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-600 hover:text-black transition-colors font-medium">
                                Terms of Service
                            </a>
                            <a href="#" className="text-gray-600 hover:text-black transition-colors font-medium">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;