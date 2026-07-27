import React, { useState } from "react";
import { Link2, Check, ArrowUp } from "lucide-react";
import logo from "../../assets/logo.png"
import { HashLink } from "react-router-hash-link";
const quickLinks = [
  { label: "Therapist", href: "#therapist" },
  { label: "About", href: "#about-us" },
  { label: "Services", href: "#services" },
  { label: "Programs", href: "#programs" },
];

const tags = ["Emotional Wellness", "Self-Awareness", "Healing", "Relationships", "Personal Growth"];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
    href: "#",
  },
  {
    label: "Facebook",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.022 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.918 8.437-9.94z" />
      </svg>
    ),
    href: "#",
  },
  {
    label: "YouTube",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.12C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.391.521a2.994 2.994 0 0 0-2.107 2.12A31.29 31.29 0 0 0 0 12a31.29 31.29 0 0 0 .502 5.814 2.994 2.994 0 0 0 2.107 2.12c1.886.521 9.391.521 9.391.521s7.505 0 9.391-.521a2.994 2.994 0 0 0 2.107-2.12A31.29 31.29 0 0 0 24 12a31.29 31.29 0 0 0-.502-5.814zM9.6 15.568V8.432L15.818 12 9.6 15.568z" />
      </svg>
    ),
    href: "#",
  },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "hello@mindfullyyou.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable, ignore
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[linear-gradient(180deg,#EEF4E7_0%,#EEF4E7_25%,#E1EAD8_50%,#D4E2C4_75%,#C8D8B2_100%)] text-[#2B3A32]">
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-16 sm:px-10 lg:px-12">
        {/* top row: contact/social — logo — quick links */}
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-3">
          {/* Left: email + social */}
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-2.5">
              <a
                href={`mailto:${email}`}
                className="text-base font-medium text-[#2B3A32] transition-colors hover:text-[#B4784F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B4784F] rounded-sm"
              >
                {email}
              </a>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy email address"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E4DECD] text-[#2B3A32] transition-colors hover:bg-[#D9CFB4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B4784F]"
              >
                {copied ? <Check className="h-3.5 w-3.5" strokeWidth={2} /> : <Link2 className="h-3.5 w-3.5" strokeWidth={2} />}
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2.5">
              {SOCIAL_LINKS.map(({ label, icon, href }) => (
                <HashLink
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D9CFB4] text-[#2B3A32] transition-colors hover:border-[#B4784F] hover:text-[#B4784F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B4784F]"
                >
                  {icon}
                </HashLink>
              ))}
            </div>
          </div>

          {/* Center: logo */}
          <div className="order-1 flex justify-center md:order-2">
            <img
              src={logo}
              alt="Mindfully You logo"
              className="h-24 w-auto object-contain sm:h-28"
            />
          </div>

          {/* Right: quick links as hash anchors */}
          <div className="order-3 flex flex-col items-center gap-2 md:items-end">
            <span className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#8A7A5E]">
              Quick Links
            </span>
            <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 md:justify-end">
              {quickLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm text-[#2B3A32] transition-colors hover:text-[#B4784F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B4784F] rounded-sm"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* credit row */}
        <div className="mt-16 border-t border-[#DED5B8] pt-6 text-center">
          <p className="text-xs text-[#6F7A6C]">
            © {new Date().getFullYear()} Mindfully You. All rights reserved.
          </p>
        </div>

        {/* tagline + tags, below credit section */}
        <div className="mt-6 flex flex-col items-center text-center">
          <p className="text-sm italic text-[#5B6B5E]" style={{ fontFamily: "'Lora', Georgia, serif" }}>
            Where your mind &amp; heart feel at home.
          </p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs uppercase tracking-wide text-[#8A7A5E]">
            {tags.map((tag, i) => (
              <li key={tag} className="flex items-center gap-3">
                {i !== 0 && <span className="h-1 w-1 rounded-full bg-[#C9BFA0]" aria-hidden="true" />}
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* back to top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="absolute bottom-8 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#2B3A32] text-[#F3EFE4] shadow-md transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B4784F] sm:right-10 lg:right-12"
      >
        <ArrowUp className="h-4 w-4" strokeWidth={2} />
      </button>
    </footer>
  );
}