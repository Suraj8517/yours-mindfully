import React, { useEffect, useRef, useState } from 'react'
import leafImg from '../../assets/leaf.png' 

export default function TextSection() {
  const sectionRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateOffset = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        // distance the section has traveled through the viewport
        const progress = window.innerHeight - rect.top
        setScrollY(progress)
      }
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateOffset)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateOffset()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[80vh] max-w-screen flex justify-center items-center bg-[#FCFBF8] overflow-hidden "
    >
      <img
        src={leafImg}
        alt=""
        draggable="false"
        className="pointer-events-none select-none absolute -top-16 -left-16 w-[48vw] opacity-90 will-change-transform "
        style={{ transform: `translateY(${scrollY * 0.12}px)` }}
      />

      <img
        src={leafImg}
        alt=""
        draggable="false"
        className="pointer-events-none select-none absolute -top-16 -right-16 w-[38vw]  opacity-90 will-change-transform scale-x-[-1]"
        style={{ transform: `translateY(${scrollY * 0.2}px) scaleX(1)` }}
      />
   <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-50 z-[5]"
        style={{
          background: 'linear-gradient(to bottom, rgba(252,251,248,0) 0%, #FCFBF8 100%)',
        }}
      />
      <h2
        className="relative z-10 text-[60px] 2xl:text-[100px] leading-tight text-center max-w-4xl 2xl:max-w-6xl text-[#E46F83] will-change-transform"
        style={{ transform: `translateY(${-scrollY * 0.06}px)` }}
      >
        Understand yourself, strengthen relationships, and thrive with confidence.
      </h2>
    </div>
  )
}