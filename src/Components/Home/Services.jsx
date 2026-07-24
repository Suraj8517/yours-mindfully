import React, { useEffect, useRef } from "react";
import {
  MessageCircle,
  HeartHandshake,
  Users,
  Layers,
  BookOpen,
  Video,
  UsersRound,
  HeartIcon,
  ArrowRight,
} from "lucide-react";

/**
 * "Choose the Support That's Right for You" — true stacking scroll cards.
 *
 * All cards live inside ONE pinned (sticky) viewport-height section.
 * As you scroll:
 *  - card 0 sits still, fully visible
 *  - once the NEXT card starts arriving, card 0 stays perfectly still
 *    (no drift) and only shrinks + fades FULLY OUT in place, while card 1
 *    physically slides up from off-screen bottom and covers it
 *  - card 2 then slides up and covers card 1, and so on
 * Positions are read from scroll on every frame and written straight to
 * refs (no React state), so it stays smooth.
 */

const HOLD = 70; // vh of scroll where the active card just sits still (reading time)
const TRANS = 100; // vh of scroll for the "next card slides up and covers" transition
const SEGMENT = HOLD + TRANS;
const OFFSCREEN = 110; // vh the waiting card sits below the fold — keeps it fully hidden, just a little below

// Flat, muted accent per track — used sparingly (one small badge, one rule,
// one chip) rather than washed across the whole card. Each track also
// carries a photo for its panel; a soft accent-tinted wash sits over the
// image so the color identity still reads at a glance.
const VALUES = [
  {
    format: "1:1 Session",
    title: "Clarity Connect",
    subtitle: "Sometimes, clarity begins with one honest conversation.",
    body:
      "A focused one-on-one emotional wellness session designed to help you understand your current challenges, gain professional insight, and identify the right path forward.",
    icon: MessageCircle,
    accent: "#3B6E8F",
    tint: "#EEF3F6",
    image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=800&q=70",
    tagsLabel: "Ideal for",
    tags: [
      "Stress & burnout",
      "Overthinking",
      "Anxiety",
      "Emotional overwhelm",
      "Relationship challenges",
      "Grief & loss",
      "Work-life balance",
      "Identity confusion",
      "Life transitions",
    ],
    gainsLabel: "What you'll gain",
    gains: [
      "Professional emotional guidance",
      "Clarity about your current situation",
      "Better understanding of emotional patterns",
      "A safe, confidential space to express yourself",
      "Practical next steps for emotional wellness",
    ],
    cta: "Book Clarity Connect",
  },
  {
    format: "Therapy Program",
    title: "Personal Growth & Healing",
    subtitle: "Heal the patterns, not just the symptoms.",
    body:
      "Our structured therapy sessions are designed to help you understand emotional patterns, regulate emotions, strengthen resilience, and create healthier ways of responding to life's challenges.",
    icon: HeartHandshake,
    accent: "#4C7A46",
    tint: "#EEF4EC",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=70",
    tagsLabel: "We help with",
    tags: [
      "Anxiety",
      "Emotional regulation",
      "Stress management",
      "Self-esteem",
      "People pleasing",
      "Childhood wounds",
      "Burnout",
      "Grief",
      "Confidence",
      "Emotional awareness",
    ],
    gainsLabel: "What makes it different",
    gains: [
      "Psychological assessments",
      "Structured therapeutic sessions",
      "Practical worksheets",
      "Behavioural strategies",
      "Emotional regulation tools",
      "Guided reflection",
    ],
    cta: "Download brochure",
  },
  {
    format: "Couples Program",
    title: "Relationship Wellness",
    subtitle: "Because healthy relationships begin with emotional awareness.",
    body:
      "Relationships thrive when we understand ourselves and each other. Whether you're preparing for commitment, rebuilding trust, improving communication, or navigating recurring conflicts, our relationship services are designed to help.",
    icon: Users,
    accent: "#A24B52",
    tint: "#F6EDEE",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=70",
    tagsLabel: "Our services",
    subServices: [
      { name: "Relationship Readiness", desc: "Prepare yourself emotionally before entering a committed relationship or marriage." },
      { name: "Relationship Renewal", desc: "Reconnect, rebuild trust, improve communication, and strengthen emotional connection." },
      { name: "Couple Therapy", desc: "Structured therapeutic sessions to improve emotional safety, communication, conflict resolution, and relationship satisfaction." },
    ],
    tags: ["Relationship readiness", "Relationship renewal", "Couple therapy"],
    gainsLabel: "What you'll learn",
    gains: [
      "Communication skills",
      "Attachment awareness",
      "Emotional needs",
      "Conflict resolution",
      "Trust building",
      "Relationship patterns",
    ],
    cta: "Download relationship brochure",
  },
  {
    format: "Add-on",
    title: "Emotional Wellness Add-Ons",
    subtitle: "Because emotional wellness strengthens every life journey.",
    body:
      "Emotional well-being plays a vital role in physical health, life transitions, and personal growth. Our add-on programs provide structured emotional support alongside important stages of life.",
    icon: Layers,
    accent: "#B08222",
    tint: "#F8F1E2",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=70",
    tagsLabel: null,
    tags: [],
    gainsLabel: "Program benefits",
    gains: [
      "Emotional wellness assessment",
      "Personalized wellness report",
      "Guided workbooks",
      "Progress tracking",
      "Community support",
      "One-on-one review",
    ],
    cta: "Download brochure",
    cta2: "Enquire now",
  },
  {
    format: "Self-paced Course",
    title: "Journey to Yourself",
    subtitle: "Small lessons. Lasting transformation.",
    body:
      "Our bite-sized learning modules make emotional wellness practical, engaging, and easy to integrate into everyday life. Each module focuses on one important emotional wellness topic and includes practical tools you can immediately apply.",
    icon: BookOpen,
    accent: "#6E4E8C",
    tint: "#F1EDF5",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=70",
    tagsLabel: "Topics include",
    tags: [
      "Emotional awareness",
      "Stress management",
      "Emotional regulation",
      "Self-worth",
      "Boundaries",
      "Overthinking",
      "Relationships",
      "Mindfulness",
      "Inner child healing",
      "Emotional resilience",
    ],
    gainsLabel: "Every module includes",
    gains: [
      "Video lessons",
      "Guided reflection",
      "Worksheets",
      "Practice activities",
      "Self-assessments",
    ],
    cta: "View brochure",
  },
  {
    format: "Live Event",
    title: "Webinars & Masterclasses",
    subtitle: "Learn. Reflect. Grow.",
    body:
      "Join live online sessions designed to make psychology simple, relatable, and practical. Our webinars and masterclasses explore emotional wellness topics that help you better understand yourself and your relationships.",
    icon: Video,
    accent: "#A15A28",
    tint: "#F7EFE7",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=70",
    tagsLabel: "Topics include",
    tags: [
      "Relationship healing",
      "Stress management",
      "Emotional intelligence",
      "Parenting",
      "Boundaries",
      "Self-awareness",
      "Inner child healing",
      "Emotional regulation",
    ],
    gainsLabel: "What's included",
    gains: [
      "Live interactive sessions",
      "Reflection exercises",
      "Practical psychological insights",
      "Downloadable resources",
    ],
    cta: "View upcoming events",
    cta2: "Past masterclasses",
  },
  {
    format: "Membership",
    title: "Community",
    subtitle: "Healing grows stronger together.",
    body:
      "Become part of a supportive emotional wellness community where growth continues beyond individual sessions.",
    icon: UsersRound,
    accent: "#33746A",
    tint: "#EAF3F1",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=70",
    tagsLabel: null,
    tags: [],
    gainsLabel: "Community includes",
    gains: [
      "Weekly reflection prompts",
      "Guided journaling",
      "Practical exercises",
      "Emotional check-ins",
      "Community discussions",
      "Mindfulness activities",
    ],
    cta: "Join our community",
  },
];

const N = VALUES.length;
const TOTAL_SCROLL_VH = (N - 1) * SEGMENT + HOLD; // scroll distance the pin consumes
const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

function Panel({ accent, image, Icon, title }) {
  return (
    <div
      className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-2xl sm:aspect-auto sm:h-full sm:w-[42%] 2xl:w-[40%] sm:self-stretch sm:rounded-[3.5rem] 2xl:rounded-[4rem]"
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
   
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(165deg, ${accent}66 0%, ${accent}1a 55%, ${accent}00 80%)`,
        }}
      />
    
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 45%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center sm:items-start sm:justify-start sm:p-6 2xl:p-9">
  <div className="flex items-center gap-3 rounded-full bg-black/40 backdrop-blur-md px-4 py-3 2xl:gap-4 2xl:px-4 2xl:py-3">
    <div
      className="flex h-12 w-12 items-center justify-center rounded-full bg-white sm:h-11 sm:w-11 2xl:h-12 2xl:w-14"
    >
      <Icon size={19} strokeWidth={1.6} color={accent} className="2xl:hidden block" />
      <Icon size={24} strokeWidth={1.6} color={accent} className="hidden 2xl:block" />
    </div>

    <h2
      className="text-xl font-extrabold text-white whitespace-nowrap 2xl:text-[1.25rem]"
    >
      {title}
    </h2>
  </div>
</div>
    </div>
  );
}

function TagChip({ label }) {
  return (
    <span className="rounded-full border bg-green-200 border-green-800/8 px-3 py-[0.3rem] text-[0.72rem] 2xl:px-5 2xl:py-[0.5rem] 2xl:text-[1rem] font-light leading-none text-green-900 sm:text-[0.74rem]">
      {label}
    </span>
  );
}

function GainRow({ text, accent }) {
  return (
    <li className="flex items-start gap-2.5 2xl:gap-3">
      <span
        className="mt-[0.2rem]  flex h-[1.05rem] 2xl:h-6 w-[1.05rem] 2xl:w-6  shrink-0 items-center justify-center rounded-full"
       
      >
        <HeartIcon size={10} strokeWidth={4} color="#E46F83" className="2xl:hidden block" />
                <HeartIcon size={16} strokeWidth={4} color="#E46F83" className="hidden 2xl:block" />

      </span>
      <span className="text-[0.83rem] 2xl:text-[1.05rem] leading-snug text-[#3C3E3A] sm:text-[0.86rem]">
        {text}
      </span>
    </li>
  );
}

function SubServiceRow({ name, desc, accent }) {
  return (
    <li className="flex flex-col gap-0.5 2xl:gap-1 border-l border-black/20 pl-2 2xl:pl-4">
      <span
        className="text-[0.78rem] 2xl:text-[1rem]  font-bold leading-snug sm:text-[0.8rem]"
        style={{ color: accent }}
      >
        {name}
      </span>
      <span className="text-[0.8rem] 2xl:text-[0.85rem]  leading-snug text-[#3C3E3A] sm:text-[0.63rem]">
        {desc}
      </span>
    </li>
  );
}

export default function StackingValues() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const fontLoaded = useRef(false);

  useEffect(() => {
    if (!fontLoaded.current) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Inter:wght@400;500;600&display=swap";
      document.head.appendChild(link);
      fontLoaded.current = true;
    }
  }, []);

  // Smoothed state per card: what's actually applied to the DOM, eased
  // toward the scroll-driven target every frame so motion never feels
  // like it's snapping directly to the scroll position.
  const smoothState = useRef(
    VALUES.map((_, i) => ({ ty: i === 0 ? 0 : OFFSCREEN, scale: i === 0 ? 1 : 0.96, opacity: i === 0 ? 1 : 0 }))
  );

  useEffect(() => {
    let rafId = null;
    const SMOOTHING = 0.16; // lower = smoother/slower catch-up, higher = snappier

    const computeTarget = (i, scrolledVh) => {
      const startVh = i * SEGMENT;
      const ls = scrolledVh - startVh;

      if (i === 0) {
        if (ls < HOLD) return { ty: 0, scale: 1, opacity: 1 };
        // being covered by the next card: stays perfectly centered,
        // shrinks slightly and fades all the way to fully transparent
        // while the next card slides over it
        const u = clamp((ls - HOLD) / TRANS, 0, 1);
        return { ty: 0, scale: 1 - u * 0.04, opacity: 1 - u };
      }

      if (ls < -TRANS) {
        // waiting below the fold — fully transparent and off-screen
        return { ty: OFFSCREEN, scale: 0.96, opacity: 0 };
      }
      if (ls < 0) {
        // sliding up from the bottom to cover the previous card — fades
        // in as it arrives, plus the slide + slight scale settle
        const t = (ls + TRANS) / TRANS;
        return { ty: OFFSCREEN * (1 - t), scale: 0.96 + 0.04 * t, opacity: t };
      }
      if (ls < HOLD) {
        // fully arrived, locked dead-center, fully readable
        return { ty: 0, scale: 1, opacity: 1 };
      }
      // being covered by the NEXT card (skip for the very last card) —
      // fades all the way to fully transparent underneath the incoming card
      const u = clamp((ls - HOLD) / TRANS, 0, 1);
      const active = i === N - 1 ? 0 : u;
      return { ty: 0, scale: 1 - active * 0.04, opacity: 1 - active };
    };

    const loop = () => {
      const container = containerRef.current;
      if (container) {
        const vh = window.innerHeight;
        const rect = container.getBoundingClientRect();
        const scrolledVh = clamp((-rect.top / vh) * 100, 0, TOTAL_SCROLL_VH);

        for (let i = 0; i < N; i++) {
          const card = cardRefs.current[i];
          if (!card) continue;

          const target = computeTarget(i, scrolledVh);
          const cur = smoothState.current[i];

          cur.ty += (target.ty - cur.ty) * SMOOTHING;
          cur.scale += (target.scale - cur.scale) * SMOOTHING;
          cur.opacity += (target.opacity - cur.opacity) * SMOOTHING;

          // snap once close enough to avoid endless tiny sub-pixel updates
          if (Math.abs(target.ty - cur.ty) < 0.01) cur.ty = target.ty;
          if (Math.abs(target.scale - cur.scale) < 0.001) cur.scale = target.scale;
          if (Math.abs(target.opacity - cur.opacity) < 0.002) cur.opacity = target.opacity;

          card.style.transform = `translate(-50%, calc(-50% + ${cur.ty}vh)) scale(${cur.scale})`;
          card.style.opacity = cur.opacity;
          // fully transparent cards shouldn't intercept scroll/hover
          card.style.pointerEvents = cur.opacity < 0.05 ? "none" : "auto";
        }
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div style={{ background: "#FAFAF8", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Pinned stacking section — heading lives inside the sticky area so it
          stays put on screen while the cards scroll and stack beneath it */}
      <div ref={containerRef} className="relative" style={{ height: `${TOTAL_SCROLL_VH + 100}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <div className="mx-auto w-full max-w-5xl shrink-0 px-6 pb-4 pt-8 sm:pb-2 sm:pt-3 2xl:max-w-6xl 2xl:pt-16 2xl:pb-5">
            <p className="mb-1 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[#9A9C93] sm:text-[0.76rem] 2xl:mb-3 2xl:text-[0.88rem] 2xl:tracking-[0.2em]">
              Emotional wellness, tailored to you
            </p>
            <h2
              className="max-w-3xl text-[1.9rem] leading-[1.06] tracking-[-0.02em] text-[#E46F83] sm:text-[2rem] 2xl:max-w-4xl 2xl:text-[3rem]"
              style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800 }}
            >
              Choose the support that's right for you
            </h2>
         
          </div>

          <div className="relative min-h-0 flex-1">
          {VALUES.map((value, i) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                ref={(el) => (cardRefs.current[i] = el)}
                className="absolute left-1/2 top-1/2 flex w-[92%] max-w-5xl flex-col gap-5 rounded-[1.75rem] border border-black/[0.06] bg-white p-5 shadow-[inset_0_0_0_2px_rgba(155,177,120,0.18),inset_0_4px_24px_8px_rgba(155,177,120,0.22)] h-[45rem] sm:h-[29rem] sm:w-[86%] sm:flex-row sm:items-stretch sm:gap-9 sm:rounded-[5rem] sm:p-6 2xl:h-[46rem] 2xl:max-w-6xl 2xl:gap-14 2xl:rounded-[6rem] 2xl:p-11"
                style={{
                  zIndex: i,
                  willChange: "transform, opacity",
                }}
              >
                <Panel accent={value.accent} image={value.image} Icon={Icon} title={value.title}/>

                <div className="flex min-h-0 flex-1 flex-col sm:w-[64%] 2xl:mt-5 ">
                  <div className="shrink-0 ">
                    <p
                      className="text-[0.72rem] font-semibold italic leading-snug 2xl:text-[1.2rem]"
                      style={{ color: value.accent }}
                    >
                      {value.subtitle}
                    </p>
                    <p className="max-w-md text-[0.85rem] 2xl:text-[1.08rem] leading-relaxed text-[#68695F]/90 sm:text-[0.9rem] mt-2 2xl:max-w-lg 2xl:mt-3">
                      {value.body}
                    </p>
                  </div>

                  <div className="no-scrollbar mt-2 flex flex-1 flex-col justify-[safe_center] overflow-y-auto pr-1 2xl:mt-4 2xl:pr-2">
                    {value.subServices && (
                      <div className="mb-3  2xl:mb-4">
                        <p className="mb-2  2xl:mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#A0A196] 2xl:text-[0.85rem] 2xl:tracking-[0.14em]">
                          {value.tagsLabel}
                        </p>
                      <ul className="sm:grid sm:grid-cols-3 gap-1.5 2xl:gap-4">
  {value.subServices.map((s) => (
    <SubServiceRow
      key={s.name}
      name={s.name}
      desc={s.desc}
      accent={value.accent}
    />
  ))}
</ul>
                      </div>
                    )}

                    {!value.subServices && value.tagsLabel && (
                      <div className="mb-2 2xl:mb-6">
                        <p className="mb-2 2xl:mb-4 text-[0.68rem] 2xl:text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-[#A0A196] 2xl:tracking-[0.14em]">
                          {value.tagsLabel}
                        </p>
                        <div className="flex flex-wrap gap-1.5 2xl:gap-2.5">
                          {value.tags.map((tag) => (
                            <TagChip key={tag} label={tag} />
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <p className="mb-2 2xl:mb-4 text-[0.68rem] 2xl:text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-[#A0A196] 2xl:tracking-[0.14em]">
                        {value.gainsLabel}
                      </p>
                      <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-1 2xl:gap-x-7 2xl:gap-y-3">
                        {value.gains.map((gain) => (
                          <GainRow key={gain} text={gain} accent={value.accent} />
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-2 flex shrink-0 flex-wrap items-center gap-3 border-t border-black/[0.06] pt-4 2xl:mt-4 2xl:gap-4 2xl:pt-7">
                    <button
                      type="button"
                      className="group inline-flex items-center gap-1.5 rounded-full bg-[#161715] px-5 py-2.5 text-[0.82rem] font-medium text-white transition-opacity duration-200 hover:opacity-85 active:opacity-70 2xl:gap-2 2xl:px-7 2xl:py-3.5 2xl:text-[1rem]"
                    >
                      {value.cta}
                      <ArrowRight
                        size={15}
                        strokeWidth={2}
                        className="transition-transform duration-200 group-hover:translate-x-0.5 2xl:hidden block"
                      />
                      <ArrowRight
                        size={19}
                        strokeWidth={2}
                        className="hidden transition-transform duration-200 group-hover:translate-x-0.5 2xl:block"
                      />
                    </button>
                    {value.cta2 && (
                      <button
                        type="button"
                        className="group inline-flex items-center gap-1.5 rounded-full border border-black/[0.12] bg-white px-5 py-2.5 text-[0.82rem] font-medium text-[#161715] transition-opacity duration-200 hover:opacity-70 active:opacity-55 2xl:gap-2 2xl:px-7 2xl:py-3.5 2xl:text-[1rem]"
                      >
                        {value.cta2}
                        <ArrowRight
                          size={15}
                          strokeWidth={2}
                          className="transition-transform duration-200 group-hover:translate-x-0.5 2xl:hidden block"
                        />
                        <ArrowRight
                          size={19}
                          strokeWidth={2}
                          className="hidden transition-transform duration-200 group-hover:translate-x-0.5 2xl:block"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}