import React from "react";
import InfiniteImageStrip from "./ImageScroll";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden flex flex-col bg-[linear-gradient(180deg,#C8D8B2_0%,#D4E2C4_25%,#E1EAD8_50%,#EEF4E7_75%,#EEF4E7_100%)]">
      {/* soft vignette, same treatment as before, tuned to the green palette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0)_55%)]" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-5xl text-5xl md:text-6xl lg:text-[110px] text-[#3F4A33] ">
          Emotional Wellness, Designed for Real Life.
        </h1>

        <p className="mt-12 text-lg md:text-2xl text-[#3F4A33]/80 max-w-xl">
          Understand Yourself. Heal Emotional Patterns. Build Meaningful Relationships. Live with Clarity.
        </p>

        <button
          type="button"
          className="mt-9 rounded-full border border-[#3F4A33]/30 bg-[#4C5A3D] px-8 py-3.5 text-sm md:text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-[#3F4A33] hover:-translate-y-0.5 [font-family:var(--font-body)]"
        >
          Book a Discovery Session
        </button>
      </div>
     
    </section>
  );
}