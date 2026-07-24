import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";

const quickLinks = ["Home", "About", "Services", "Programs", "Modules", "Webinars", "Community", "Contact"];

const pillars = ["Emotional Wellness", "Self-Awareness", "Healing", "Relationships", "Personal Growth"];

const contactItems = [
  { icon: Phone, label: "Phone", value: "Insert Number", href: "tel:" },
  { icon: Mail, label: "Email", value: "Insert Email", href: "mailto:" },
  { icon: MapPin, label: "Location", value: "Insert Address, if applicable", href: undefined },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "#" },
  { icon: MessageCircle, label: "Instagram", value: "@mindfullyyou", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-teal-950 text-stone-300">
      {/* Horizon divider — a quiet sunrise line, the calm this brand promises */}
      <div className="absolute -top-px left-0 right-0 h-px overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 1200 20" preserveAspectRatio="none" className="h-5 w-full">
          <path
            d="M0,10 C150,2 300,18 450,10 C600,2 750,18 900,10 C1050,2 1150,18 1200,10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-teal-800"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-16 pb-10 sm:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-300 opacity-60 [animation-duration:3s]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-300" />
              </span>
              <h2 className="font-serif text-2xl italic tracking-wide text-stone-50">Mindfully You</h2>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-400">
              Where your mind &amp; heart feel at home.
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-2 text-xs">
              {pillars.map((pillar, i) => (
                <li key={pillar} className="flex items-center gap-2">
                  <span className="rounded-full border border-teal-800 px-3 py-1 tracking-wide text-stone-400">
                    {pillar}
                  </span>
                  {i < pillars.length - 1 && <span className="sr-only"> · </span>}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-1.5 text-sm text-stone-300 transition-colors hover:text-stone-50"
                  >
                    <span className="border-b border-transparent group-hover:border-rose-300/60">{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">Connect With Us</h3>
            <ul className="mt-5 space-y-4">
              {contactItems.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <span className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" strokeWidth={1.75} />
                    <span className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-wide text-stone-500">{label}</span>
                      <span className="text-sm text-stone-200">{value}</span>
                    </span>
                  </span>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} className="group flex items-start transition-colors hover:text-stone-50">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-teal-800/70 pt-6 text-xs text-stone-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Mindfully You. All rights reserved.</p>
          <a href="#top" className="group inline-flex items-center gap-1 text-stone-400 hover:text-rose-300">
            Back to a quiet mind
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}