import React from 'react'
import { Outlet } from 'react-router'
import Banner from '../Banner/Banner'
import TopScholarship from '../TopScholarship/TopScholarship'
import Feature from '../Feature/Feature'
import IdeaSection from '../IdeaSection/IdeaSection'

const Home = () => {
  return (
    <>
  
    <Banner/>
    <TopScholarship/>
    <IdeaSection/>
    <Feature/>
   
    <Outlet/>
    
    </>
  )
}

export default Home