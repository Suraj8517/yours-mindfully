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

export default function InfiniteImageStrip() {
  const track = [...images, ...images];

  return (
    <section className="pb-8 sm:pb-12 md:pb-16 relative h-[60vh] sm:h-[75vh] md:h-screen w-full overflow-hidden bg-[linear-gradient(180deg,#EEF4E7_0%,#F2F6EE_30%,#F6F8F2_60%,#FAFBF8_85%,#FCFBF8_100%)]">
      <div className="strip-track flex h-full w-max items-center py-5 sm:py-8 md:py-10">
        {track.map((img, i) => (
          <div
            key={i}
            className={`strip-item h-full flex-none w-[68vw] mx-2 sm:w-[45vw] sm:mx-3 md:w-[35vw] md:mx-4 ${
              i % 2 === 0 ? "strip-item-even" : "strip-item-odd"
            }`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl"
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

        .strip-item-even { transform: translateY(-20px); }
        .strip-item-odd { transform: translateY(20px); }

        @media (min-width: 640px) {
          .strip-item-even { transform: translateY(-32px); }
          .strip-item-odd { transform: translateY(32px); }
          .strip-track { animation-duration: 28s; }
        }

        @media (min-width: 768px) {
          .strip-item-even { transform: translateY(-40px); }
          .strip-item-odd { transform: translateY(40px); }
          .strip-track { animation-duration: 32s; }
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