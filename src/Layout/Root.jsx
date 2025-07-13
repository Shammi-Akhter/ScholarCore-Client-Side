import React from 'react';
import Navbar from '../Component/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer/Footer';
import { Toaster } from 'react-hot-toast';

const Root = () => {
    return (
        <div>
              <Toaster position="top-center" reverseOrder={false} />
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Root;