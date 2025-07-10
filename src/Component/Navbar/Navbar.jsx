import React, { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

// Navigation links for re‑use
const navItems = [
    { path: "/", label: "Home" },
    { path: "/all-scholarships", label: "All Scholarships" },
    { path: "", label: "User Dashboard" },
    { path: "", label: "Admin Dashboard" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();


    React.useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const renderLinks = () => (
        <ul className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 text-base font-medium">
            {navItems.map(({ path, label }) => (
                <li key={path}>
                    <NavLink
                        to={path}
                        className={({ isActive }) =>
                            `transition-colors duration-200 hover:text-primary-600 ${isActive ? "text-yellow-500" : "text-white dark:text-gray-200"
                            }`
                        }
                    >
                        {label}
                    </NavLink>
                </li>
            ))}
        </ul>
    );

    return (
        <header className="sticky bg-gray-800 top-0 z-50  dark:bg-gray-900/80 backdrop-blur shadow-sm">
            <nav className="container mx-auto flex items-center justify-between py-3 px-4 lg:px-6">

                <NavLink to="/" className="flex items-center gap-2 text-xl font-semibold">

                    <img src="https://i.postimg.cc/hv5WW3Nx/lo2-removebg-preview.png" alt="ScholarCore logo" className="h-12 w-12 text-white object-contain" />
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e0c87d] via-[#ffffff] to-[#e0c87d]">
                        ScholarCore
                    </h1>


                </NavLink>

                <div className="hidden lg:block">{renderLinks()}</div>

                <div className="hidden sm:flex gap-4">
                    <NavLink
                        to="/login"
                        className="px-4 py-2 rounded-lg text-white border border-primary-600 text-primary-600 transition-colors hover:bg-primary-50 dark:hover:bg-primary-700/20"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/"
                        className="w-full text-center text-white px-4 py-2 rounded-lg border border-primary-600 text-primary-600 transition-colors hover:bg-primary-50 dark:hover:bg-primary-700/20"
                    >
                        Logout
                    </NavLink>
                    <NavLink
                        to="/register"
                        className="px-4 py-2 rounded-lg bg-primary-600 text-white transition-colors hover:bg-primary-700"
                    >
                        Register
                    </NavLink>
                </div>

                <button
                    type="button"
                    aria-label="Toggle menu"
                    className="inline-flex lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                    onClick={() => setOpen((prev) => !prev)}
                >
                    {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </nav>


            {open && (
                <div className="lg:hidden bg-white dark:bg-gray-900 shadow-md border-t border-gray-200 dark:border-gray-700">
                    <div className="container mx-auto px-4 py-4 space-y-6">
                        {renderLinks()}
                        <div className="flex flex-col gap-3 pt-2 sm:hidden">
                            <NavLink
                                to="/login"
                                className="w-full text-center text-white px-4 py-2 rounded-lg border border-primary-600 text-primary-600 transition-colors hover:bg-primary-50 dark:hover:bg-primary-700/20"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/"
                                className="w-full text-white text-center px-4 py-2 rounded-lg border border-primary-600 text-primary-600 transition-colors hover:bg-primary-50 dark:hover:bg-primary-700/20"
                            >
                                Logout
                            </NavLink>
                            <NavLink
                                to="/register"
                                className="w-full text-center px-4 py-2 rounded-lg bg-primary-600 text-white transition-colors hover:bg-primary-700"
                            >
                                Register
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
