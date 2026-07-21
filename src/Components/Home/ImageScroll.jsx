import React from "react";

/**
 * Full-height image strip that scrolls continuously left,
 * with images alternating up/down in a zigzag, looping seamlessly.
 *
 * Swap the `images` array with your own URLs — captions are optional.
 */
const images = [
  {
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
    alt: "Mediterranean mezze spread with hummus and olives",
  },
  {
    src: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop",
    alt: "Singing bowl and palo santo ritual",
  },
  {
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
    alt: "Sound bath session on yoga mats",
  },
  {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop",
    alt: "Fresh vegetable and dip platter",
  },
  {
    src: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200&auto=format&fit=crop",
    alt: "Meditation cushion by a sunlit window",
  },
];

const ZIGZAG_OFFSET = 40;

export default function InfiniteImageStrip() {
  const track = [...images, ...images];

  return (
    <section className="pb-16 relative h-screen w-full overflow-hidden bg-[linear-gradient(180deg,#EEF4E7_0%,#F2F6EE_30%,#F6F8F2_60%,#FAFBF8_85%,#FCFBF8_100%)]">
      <div
        className="strip-track flex h-full w-max items-center"
        style={{ paddingTop: ZIGZAG_OFFSET, paddingBottom: ZIGZAG_OFFSET }}
      >
        {track.map((img, i) => (
          <div
            key={i}
            className="h-full flex-none mx-4"
            style={{
              width: "35vw",
              transform: `translateY(${i % 2 === 0 ? -ZIGZAG_OFFSET : ZIGZAG_OFFSET}px)`,
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover rounded-3xl shadow-xl"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <style>{`
        .strip-track {
          animation: scroll-left 32s linear infinite;
        }
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .strip-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}