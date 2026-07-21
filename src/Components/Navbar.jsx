import React, { useState } from 'react'
import logo from "../assets/logo.png"
const NAV_LINKS = ['About', 'Services', 'Blog']



export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50 w-full bg-transparent">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 sm:px-8 md:px-10 lg:px-14 xl:px-20">
        {/* Left — links (desktop) / hamburger (mobile) */}
        <div className="flex items-center">
          <ul className="hidden items-center gap-8 md:flex xl:gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-sm font-medium tracking-wide text-white/90 transition-colors hover:text-white xl:text-base"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`block h-[1.5px] w-6 bg-white transition-transform duration-300 ${
                open ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] w-6 bg-white transition-opacity duration-300 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-[1.5px] w-6 bg-white transition-transform duration-300 ${
                open ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>

        {/* Center — logo */}
        <a
          href="#home"
          className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center text-white"
        >
     <img src={logo} className='w-18'/>
        </a>

        {/* Right — CTA (desktop) */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-white px-6 py-2.5 text-sm font-medium tracking-wide text-[#7C8471] transition-colors hover:bg-white/90 xl:px-7 xl:text-base"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile spacer so hamburger/logo layout stays balanced */}
        <div className="w-6 md:hidden" />
      </nav>

      {/* Mobile dropdown menu */}
      <div
        className={`overflow-hidden bg-[#7C8471] transition-[max-height] duration-300 ease-in-out md:hidden ${
          open ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col items-center gap-6 px-6 py-8">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-base font-medium tracking-wide text-white/90 hover:text-white"
              >
                {link}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center rounded-full bg-white px-7 py-2.5 text-sm font-medium tracking-wide text-[#7C8471] hover:bg-white/90"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
