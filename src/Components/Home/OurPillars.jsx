import React, { useEffect, useRef, useState } from "react";

/**
 * "Our materials" scroll-pinned section.
 *
 * Behaviour:
 * 1. The whole section scrolls up normally with the page.
 * 2. Once its top edge reaches the top of the viewport, the section "locks":
 *    the left column (title) becomes fixed/sticky, and only the right
 *    column's content scrolls internally, panel by panel.
 * 3. Once the last right-column panel has fully scrolled through, the
 *    section unlocks and the page resumes normal scrolling past it.
 *
 * Implementation notes:
 * - The outer wrapper is tall (slides.length * 100vh) so there is enough
 *   scroll distance to drive the internal animation.
 * - An inner element is `sticky top-0 h-screen` — this is what pins.
 * - Progress (0 -> 1) is derived from how far we've scrolled through the
 *   wrapper, and used to translateY the stacked right-column panels.
 */

// Tune these to control card sizing/spacing precisely, per breakpoint.
// Tailwind's `2xl` breakpoint is 1536px.
const CARD_HEIGHT_VH_XL = 72; // card height below 1536px (xl and smaller)
const CARD_HEIGHT_VH_2XL = 58; // card height at 1536px and above
const CARD_GAP_VH = 4; // vertical gap between stacked cards, in vh
const TWO_XL_BREAKPOINT = 1536;

const slides = [
  {
    id: "biomass",
    title: "It begins with biomass",
    body: "We fell in love with rapidly renewing biomass, at first sight. Through low-energy processes that preserve their inherent advantages we transform natural polymers into materials that run on existing lines and maintain stable performance.",
    imgAlt: "Tangled dried roots on a dark surface",
    imgClass: "from-amber-900 via-amber-700 to-stone-800",
  },
  {
    id: "chemistry",
    title: "An unmistakable chemistry",
    body: "Natural polymers demand chemistry that enhances their strengths while respecting their limits. By avoiding synthetic additives and working with their native structure, we deliver stable performance and a clean, predictable end-of-life.",
    imgAlt: "Amber liquid being poured into a petri dish",
    imgClass: "from-slate-800 via-slate-700 to-amber-700",
  },
  {
    id: "performance",
    title: "Built for performance",
    body: "Every formulation is tested against the demands of real production lines, so what works in the lab keeps working at scale, batch after batch, without compromise.",
    imgAlt: "Material sample under lab lighting",
    imgClass: "from-emerald-900 via-teal-800 to-stone-800",
  },
  {
    id: "circularity",
    title: "Designed for a clean exit",
    body: "Nothing we make is meant to outlive its purpose. Each material is designed to break down predictably at end-of-life, closing the loop instead of leaving a footprint behind.",
    imgAlt: "Compostable material breaking down naturally",
    imgClass: "from-lime-800 via-emerald-700 to-stone-800",
  },
];

export default function OurMaterials() {
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0 -> 1 across the whole pinned scroll
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardHeightVh, setCardHeightVh] = useState(CARD_HEIGHT_VH_XL);

  // Pick card height based on viewport width (matches Tailwind's 2xl breakpoint)
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${TWO_XL_BREAKPOINT}px)`);

    function updateCardHeight(e) {
      setCardHeightVh(e.matches ? CARD_HEIGHT_VH_2XL : CARD_HEIGHT_VH_XL);
    }

    updateCardHeight(mql);
    mql.addEventListener("change", updateCardHeight);
    return () => mql.removeEventListener("change", updateCardHeight);
  }, []);

  const STEP_VH = cardHeightVh;

  useEffect(() => {
    function handleScroll() {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollableDistance = wrapper.offsetHeight - viewportH;

      if (scrollableDistance <= 0) {
        setProgress(0);
        return;
      }

      // How far we've scrolled into the wrapper (0 at top, scrollableDistance at bottom)
      const scrolled = -rect.top;
      const clamped = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);

      setProgress(clamped);
      setActiveIndex(Math.min(slides.length - 1, Math.round(clamped * (slides.length - 1))));
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const translateY = -progress * (slides.length - 1) * STEP_VH; // in vh

  return (
    <section
      ref={wrapperRef}
      className="relative"
      style={{ height: `${slides.length * 100}vh` }}
    >
      {/*
        h-screen + overflow-hidden here is what clips everything to exactly
        one viewport's worth of content. IMPORTANT: no ancestor of this
        `sticky` element may have a `transform` on it (e.g. translate-y-*),
        or the sticky positioning will visually drift away from where the
        browser thinks it's "stuck". If you need an overlap effect with a
        neighbouring section, use negative margin instead of transform.
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        <div className="mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 gap-8 px-6 md:grid-cols-[220px_1fr] md:gap-12 md:px-12">
          {/* LEFT: always vertically centered on screen, independent of right column */}
          <div className="flex h-full flex-col justify-center">
            <h2 className="font-serif text-2xl leading-tight text-stone-900 sm:text-3xl">
              Our
              <br />
              materials
            </h2>
            <div className="mt-4 h-px w-16 bg-teal-700/70" />

            {/* progress dots */}
            <div className="mt-8 flex gap-2">
              {slides.map((s, i) => (
                <span
                  key={s.id}
                  className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${
                    i === activeIndex ? "bg-teal-700" : "bg-stone-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: scrolling stacked panels — fixed-height cards, next card peeks at the bottom */}
          <div className="relative h-full min-h-0 w-full overflow-hidden">
            <div
              className="flex flex-col"
              style={{
                transform: `translateY(${translateY}vh)`,
                height: `${slides.length * STEP_VH}vh`,
              }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="box-border w-full"
                  style={{
                    height: `${STEP_VH}vh`,
                    paddingBottom: `${CARD_GAP_VH}vh`,
                  }}
                >
                  <div className="relative h-full w-full">
                    {/* soft mint glow bleeding out from behind the card */}
                    <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[48px]  opacity-80 blur-2xl" />

                    <div className="grid h-full w-full grid-cols-1 bg-white overflow-hidden rounded-[62px]  shadow-[inset_0_0_0_2px_rgba(155,177,120,0.18),inset_0_4px_24px_8px_rgba(155,177,120,0.22)] sm:grid-cols-[1fr_1.05fr]">
                      {/* Text block */}
                      <div className="flex flex-col justify-center px-6 py-8 sm:px-10 lg:px-12">
                        <h3 className="font-serif text-2xl leading-tight text-stone-900 sm:text-3xl lg:text-4xl">
                          {slide.title}
                        </h3>
                        <p className="mt-4 max-w-md text-[13px] leading-relaxed text-stone-900 sm:text-sm">
                          {slide.body}
                        </p>
                      </div>

                      {/* Image block (placeholder gradient — swap with <img>) */}
                      <div
                        className={`aspect-[4/3] w-full overflow-hidden rounded-[64px] bg-gradient-to-br ${slide.imgClass} sm:aspect-auto sm:h-full`}
                        role="img"
                        aria-label={slide.imgAlt}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}