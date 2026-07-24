// MeetYourTherapist.jsx
import therapistImg from "../../assets/arthi.webp";
// ^ swap this to wherever Arthi's portrait actually lives in /assets —
// using the same relative-import pattern as the other sections here.

const EXPERTISE = [
  "Cognitive Behaviour Therapy (CBT)",
  "Rational Emotive Behaviour Therapy (REBT)",
  "Behavioural Modification Therapy",
  "Imago Relationship Therapy",
  "Shadow Mastery Coaching",
  "Inner Child Healing",
  "Family & Couple Counselling",
];

const CREDENTIALS = [
  "Member – Counsellors Council of India (CCI)",
  "Associate Counsellor – World Mental Health Care Association",
  "Certified Shadow Mastery Coach",
  "Trained Imago Relationship Therapist",
  "Recipient – Lifetime Achievement Award (Mental Health Awareness)",
];

export default function MeetYourTherapist() {
  return (
    <section className="w-full bg-[#FCFBF8] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Text column */}
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-[#657C4F]">
            MEET YOUR THERAPIST
          </p>

          <h2
            className="mt-4 text-4xl italic leading-[1.1] text-neutral-900 sm:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
          >
            Ms. Arthi Sujai
          </h2>

          <p className="mt-3 text-sm font-medium text-neutral-500 sm:text-base">
            Psychotherapist&nbsp;|&nbsp;Counselling Psychologist&nbsp;|&nbsp;Emotional Well-being Coach
          </p>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            With over 13 years of experience, Arthi has helped individuals,
            couples, and families understand emotional patterns, strengthen
            relationships, and create healthier, more fulfilling lives.
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            Her approach combines evidence-based psychological practices with
            compassionate guidance to create meaningful and sustainable
            change.
          </p>

          {/* Expertise */}
          <div className="mt-9">
            <h3 className="text-sm font-semibold tracking-wide text-neutral-900">
              Expertise
            </h3>
            <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              {EXPERTISE.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[14px] leading-snug text-neutral-700"
                >
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#657C4F]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Credentials */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold tracking-wide text-neutral-900">
              Professional Credentials
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {CREDENTIALS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[14px] leading-snug text-neutral-700"
                >
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#657C4F]/15 text-[10px] text-[#657C4F]">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/about-arthi"
              className="rounded-full border border-neutral-900 px-7 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-[#FCFBF8]"
            >
              Know More
            </a>
            <a
              href="/booking"
              className="rounded-full bg-[#657C4F] px-7 py-3 text-sm font-medium text-[#FCFBF8] transition-colors hover:bg-[#556a41]"
            >
              Book a Consultation
            </a>
          </div>
        </div>

        {/* Portrait */}
        <div className="relative h-[26rem] w-full overflow-hidden rounded-[2.5rem] sm:h-[32rem] lg:h-[38rem]">
          <img
            src={therapistImg}
            alt="Ms. Arthi Sujai, Psychotherapist and Counselling Psychologist"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}