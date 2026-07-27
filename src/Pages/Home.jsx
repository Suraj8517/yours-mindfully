import React from 'react'
import HeroSection from '../Components/Home/Hero'
import InfiniteImageStrip from '../Components/Home/ImageScroll'
import TextSection from '../Components/Home/TextSection3'
import DetailedSection from '../Components/Home/DetailedSection'
import AboutUs from '../Components/Home/AboutUs'
import OurVision from '../Components/Home/OurVision'
import FaqSection from '../Components/Home/FAQSection'
import OurPillars from '../Components/Home/OurPillars'
import OurMission from '../Components/Home/ourMission'
import Services from '../Components/Home/Services'
import HowToWorkWithUs from '../Components/Home/HowItWorks'
import {MeetYourTherapist} from '../Components/Home/AboutArthi'
import Footer from '../Components/Home/footer'

export default function Home
() {
  return (
    <div className=''>
        <HeroSection/>
         <InfiniteImageStrip/>
         <TextSection/>
         <DetailedSection/> 
          <AboutUs/>  
         <OurVision/>       
  <OurMission/>
  <OurPillars/>
  <Services/>
  <HowToWorkWithUs/>
  <MeetYourTherapist/>
    <FaqSection />
    <Footer/>
    </div>
  )
}
