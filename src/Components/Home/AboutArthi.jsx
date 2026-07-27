import { useEffect, useRef, useState } from "react";
import {User,
  Check,
  ArrowUpRight,
  Feather,
  Users,
  Award,
  Sparkles,
  HeartHandshake,
  Trophy,
  Rose,
} from "lucide-react";
import img from "../../assets/arthi.webp"

const PALETTE = {
  cream: "#FBF8F1",
  paper: "#F1ECDD",
  forest: "#1F2E24",
  forestSoft: "#3A4B3D",
  sage: "#7C8B72",
  sageLight: "#A8B49C",
  gold: "#B08D3E",
  body: "#57594F",
  line: "#DAD3C2",
};

// Accent pair requested for titles / icons across the section
const ROSE = "#e0556c";
const MOSS = "#657c4f";

const EXPERTISE = [
  "Cognitive Behaviour Therapy",
  "Rational Emotive Behaviour Therapy",
  "Behavioural Modification Therapy",
  "Imago Relationship Therapy",
  "Shadow Mastery Coaching",
  "Inner Child Healing",
  "Family & Couple Counselling",
];

const CREDENTIALS = [
  {
    title: "Member",
    org: "Counsellors Council of India (CCI)",
    icon: Award,
  },
  {
    title: "Associate Counsellor",
    org: "World Mental Health Care Association",
    icon: Award,
  },
  {
    title: "Certified Shadow Mastery Coach",
    org: "",
    icon: Award,
  },
  {
    title: "Trained Imago Relationship Therapist",
    org: "",
    icon: Award,
  },
  {
    title: "Lifetime Achievement Award",
    org: "Mental Health Awareness",
    icon: Award,
  },
];

const IMG_SRC = img

function useFonts() {
  useEffect(() => {
    if (document.getElementById("mt-fonts")) return;
    const link = document.createElement("link");
    link.id = "mt-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,400;1,9..144,500&family=Jost:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: visible ? "translateY(0)" : "translateY(18px)",
        opacity: visible ? 1 : 0,
        transition: `opacity 0.7s cubic-bezier(.22,.61,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,.61,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function WaveDivider({ color = PALETTE.line, className = "" }) {
  return (
    <svg
      viewBox="0 0 200 16"
      className={className}
      style={{ width: 120, height: 12 }}
      preserveAspectRatio="none"
    >
      <path
        d="M0 8 Q 12.5 0 25 8 T 50 8 T 75 8 T 100 8 T 125 8 T 150 8 T 175 8 T 200 8"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}

function BreathingPortrait() {
  return (
    <div className="relative mx-auto w-full max-w-[380px]">
   
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-4xl mt-4 sm:mt-1"
       
      >
        <img
          src={IMG_SRC}
          alt="Ms. Arthi Sujai, Psychotherapist"
          className="h-full w-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(31,46,36,0.5), transparent 55%)",
          }}
        />
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-3"
        style={{
          bottom: "-5%",
          background: PALETTE.cream,
          border: `1px solid ${ROSE}`,
          borderRadius: 999,
          boxShadow: "0 12px 30px -18px rgba(31,46,36,0.4)",
          whiteSpace: "nowrap",
        }}
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full shrink-0 "
          style={{ background: "rgba(176,141,62,0.15)" }}
        >
          <User size={14} style={{ color: PALETTE.gold }} />
        </span>
        <div className="leading-tight">
         <h3 className="font-bold " style={{color:ROSE}}>Arthi Sujai</h3>
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: PALETTE.sage,
              fontSize: 10,
              letterSpacing: "0.08em",
            }}
          >
            13+ YEARS IN PRACTICE
          </p>
        </div>
      </div>
    </div>
  );
}

function ExpertiseTags() {
  return (
    <div>
      <p
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.14em",
          color: ROSE,
        }}
        className="uppercase mb-3"
      >
        Expertise 
      </p>
      <div className="flex flex-wrap gap-2">
        {EXPERTISE.map((item) => (
          <span
            key={item}
            className="inline-block px-3.5 py-1.5 transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 12.5,
              color: PALETTE.forest,
              background: "#c3ea9d",
              border: `1px solid ${PALETTE.line}`,
              borderRadius: 999,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Full-bleed "On record" band.
 * Sits directly under the portrait/intro row, spans the full viewport width,
 * and gives each credential its own icon. Titles + icons use the ROSE / MOSS pair.
 */
function CredentialsBand() {
  return (
    <div
      className="w-full"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-14 lg:py-4">
        <div className="flex items-center gap-4 mb-6 justify-center">
          <p
            className="uppercase whitespace-nowrap "
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.16em",
              color: ROSE,
            }}
          >
            Professional Credentials 
          </p>
       
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {CREDENTIALS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <div
                  className="h-full pt-5 lg:pr-4"
                >
                 
                  <p className="text-center"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: 16,
                      color: MOSS,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </p>
                  {item.org && (
                    <p
                      className="mt-1.5 text-center
                      "
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: 12.5,
                        color: PALETTE.sageLight,
                        lineHeight: 1.4,
                      }}
                    >
                      {item.org}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function MeetYourTherapist() {
  useFonts();

  return (
    <section className="w-full bg-linear-to-b from-[#FAFAF8] to-[#EEF4E7] " id="therapist">
      <style>{`
        @keyframes mt-breathe {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50% { transform: scale(1.055); opacity: 0.15; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mt-breathe-el { animation: none !important; }
        }
      `}</style>

      {/* ---------------- DESKTOP ---------------- */}
      <div className="hidden md:block ">
        <div className="max-w-6xl mx-auto px-10 lg:px-16 pt-24 pb-16 grid grid-cols-12 gap-x-14 items-start">
          {/* vertical eyebrow rail */}
          <div className="col-span-1 hidden lg:flex justify-center">
            <div
              className="flex items-center gap-3"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  color: PALETTE.sage,
                }}
              >
                MEET YOUR THERAPIST
              </span>
              <span className="w-px h-14" style={{ background: PALETTE.line }} />
            </div>
          </div>

          {/* portrait column */}
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <BreathingPortrait />
            </Reveal>
          </div>

          {/* content column */}
          <div className="col-span-12 lg:col-span-6 pt-6 lg:pt-0">
            <Reveal>
              <h2
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: MOSS,
                  fontSize: "3.4rem",
                  lineHeight: 1,
                }}
              >
                Ms. Arthi Sujai
              </h2>
              <p
                className="mt-4  uppercase"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11.5,
                  letterSpacing: "0.16em",
                  color: ROSE,
                }}
              >
                Psychotherapist &middot; Counselling Psychologist &middot; Emotional Well-being Coach
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p
                className="mt-7 leading-relaxed"
                style={{ fontFamily: "'Jost', sans-serif", color: PALETTE.body, fontSize: 15 }}
              >
                With over 13 years of experience, Arthi has helped individuals, couples,
                and families understand emotional patterns, strengthen relationships, and
                create healthier, more fulfilling lives.
              </p>
              <p
                className="mt-3 leading-relaxed"
                style={{ fontFamily: "'Jost', sans-serif", color: PALETTE.body, fontSize: 15 }}
              >
                Her approach combines evidence-based psychological practices with
                compassionate guidance to create meaningful and sustainable change.
              </p>
            </Reveal>

            <Reveal delay={0.14} className="mt-8">
              <WaveDivider />
            </Reveal>

            <Reveal delay={0.16} className="mt-6">
              <ExpertiseTags />
            </Reveal>

          </div>
        </div>

        <CredentialsBand />

        <div className="flex flex-col items-center py-20">
          <WaveDivider className="mb-6" color={PALETTE.gold} />
          <p
            className="text-center max-w-md px-6"
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontSize: 21,
              color: ROSE,
            }}
          >
            Where your mind & heart feel at home. 
          </p>
        </div>
      </div>

      {/* ---------------- MOBILE ---------------- */}
      <div className="md:hidden">
        <div className="px-6 pt-16 pb-10">
          <p
            className="uppercase mb-3"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10.5,
              letterSpacing: "0.2em",
              color: PALETTE.sage,
            }}
          >
            Meet your therapist
          </p>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              color: PALETTE.forest,
              fontSize: "2.6rem",
              lineHeight: 1,
            }}
            className="mb-7"
          >
            Ms. Arthi Sujai
          </h2>

          <BreathingPortrait />

          <p
            className="uppercase mt-16 mb-4"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.14em",
              color: ROSE,
            }}
          >
            Psychotherapist &middot; Emotional Well-being Coach
          </p>
          <p
            className="leading-relaxed"
            style={{ fontFamily: "'Jost', sans-serif", color: PALETTE.body, fontSize: 14.5 }}
          >
            With over 13 years of experience, Arthi has helped individuals, couples, and
            families understand emotional patterns, strengthen relationships, and create
            healthier, more fulfilling lives.
          </p>
          <p
            className="leading-relaxed mt-3"
            style={{ fontFamily: "'Jost', sans-serif", color: PALETTE.body, fontSize: 14.5 }}
          >
            Her approach combines evidence-based psychological practices with compassionate
            guidance to create meaningful and sustainable change.
          </p>

          <WaveDivider className="my-7" />

          <ExpertiseTags />

        </div>

        {/* full-bleed credentials band, directly under the image */}
        <CredentialsBand />

        <div className="flex flex-col items-center pt-14 pb-16 px-6">
          <WaveDivider className="mb-6" color={PALETTE.gold} />
          <p
            className="text-center"
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontSize: 18,
              color: PALETTE.forest,
            }}
          >
            Where your mind & heart feel at home. 
          </p>
        </div>
      </div>
    </section>
  );
}