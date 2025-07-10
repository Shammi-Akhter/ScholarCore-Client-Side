import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Footer/Footer'
import Banner from '../Banner/Banner'
import TopScholarship from '../TopScholarship/TopScholarship'

const Home = () => {
  return (
    <>
  
    <Banner/>
    <TopScholarship/>
    <Outlet/>
    
    </>
  )
}

export default Home