import React from 'react'
import HeroSection from '../Components/Home/Hero'
import InfiniteImageStrip from '../Components/Home/ImageScroll'
import TextSection from '../Components/Home/TextSection3'
import DetailedSection from '../Components/Home/DetailedSection'
import AboutUs from '../Components/Home/AboutUs'
import OurVision from '../Components/Home/OurVision'
import FaqSection from '../Components/Home/FAQSection'
import OurPillars from '../Components/Home/OurPillars'

export default function Home
() {
  return (
    <div className=''>
        <HeroSection/>
         <InfiniteImageStrip/>
         <TextSection/>
         <DetailedSection/> 
         <OurVision/>  
        <div className="relative z-30 sm:-translate-y-[40vh]">
   <AboutUs/>  
  </div>
  <OurPillars/>
    <FaqSection />
    </div>
  )
}
