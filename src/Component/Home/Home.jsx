import React from 'react'
import { Outlet } from 'react-router'
import Banner from '../Banner/Banner'
import TopScholarship from '../TopScholarship/TopScholarship'
import Feature from '../Feature/Feature'
import IdeaSection from '../IdeaSection/IdeaSection'
import ThirdSection from '../ThirdSection/ThirdSection'

const Home = () => {
  return (
    <div className="px-2 sm:px-4 md:px-8">
      <Banner/>
      <TopScholarship/>
      <IdeaSection/>
      <ThirdSection/>
      <Feature/>
   
      <Outlet/>
      
    </div>
  )
}

export default Home