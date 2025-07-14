import React from 'react'
import { Outlet } from 'react-router'
import Banner from '../Banner/Banner'
import TopScholarship from '../TopScholarship/TopScholarship'
import Feature from '../Feature/Feature'
import IdeaSection from '../IdeaSection/IdeaSection'
import ThirdSection from '../ThirdSection/ThirdSection'

const Home = () => {
  return (
    <>
  
    <Banner/>
    <TopScholarship/>
    <IdeaSection/>
    <ThirdSection/>
    <Feature/>
   
    <Outlet/>
    
    </>
  )
}

export default Home