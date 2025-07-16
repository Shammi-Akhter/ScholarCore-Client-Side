import React from 'react';
import Navbar from '../Component/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router';
import Footer from '../Component/Footer/Footer';
import { Toaster } from 'react-hot-toast';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

const Root = () => {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <ScrollToTop />
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Root;