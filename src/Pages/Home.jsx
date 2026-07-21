import React from 'react'
import HeroSection from '../Components/Home/Hero'
import InfiniteImageStrip from '../Components/Home/ImageScroll'
import TextSection from '../Components/Home/TextSection3'

export default function Home
() {
  return (
    <div className=''>
        <HeroSection/>
         <InfiniteImageStrip/>
         <TextSection/>
    </div>
  )
}
