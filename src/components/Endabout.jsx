import React from "react";
import { useNavigate } from "react-router-dom";

/* ═══════════════════════════════════════
   SECTION 1 — What We Stand For
═══════════════════════════════════════ */
function WhatWeStandFor() {
  const cardStyle = {
    backgroundImage: "url('/Vector 5.png')",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const rightCardStyle = {
    backgroundImage: "url('/Vector 9.png')",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const cardBase =
    "absolute flex flex-col items-center justify-center text-center px-4 py-4 w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] lg:w-[300px] lg:h-[300px]";

  return (
    <section className="bg-[#fdfaf4] overflow-hidden py-10 md:py-14">
      <div className="relative max-w-[1200px] mx-auto h-[420px] sm:h-[480px] md:h-[560px] flex items-center justify-center">

        {/* LEFT TOP */}
        <div
          className={`${cardBase} -rotate-[8deg] hidden sm:flex`}
          style={{ ...cardStyle, top: "0%", left: "0%" }}
        >
          <p className="text-[12px] sm:text-[14px] md:text-[15px] text-[#3d2800] mb-2">
            Designs that never go out of style
          </p>
          <p className="text-[10px] sm:text-[11px] italic text-[#8b6914] font-semibold">
            Timeless Elegance
          </p>
        </div>

        {/* LEFT BOTTOM */}
        <div
          className={`${cardBase} -rotate-[5deg] hidden sm:flex`}
          style={{ ...cardStyle, bottom: "0%", left: "5%" }}
        >
          <p className="text-[12px] sm:text-[14px] md:text-[15px] text-[#3d2800] mb-2">
            Finest fabrics with superior craftsmanship
          </p>
          <p className="text-[10px] sm:text-[11px] italic text-[#8b6914] font-semibold">
            Uncompromising Quality
          </p>
        </div>

        {/* RIGHT TOP */}
        <div
          className={`${cardBase} rotate-[9deg] hidden sm:flex`}
          style={{ ...rightCardStyle, top: "0%", right: "5%" }}
        >
          <p className="text-[12px] sm:text-[14px] md:text-[15px] text-[#3d2800] mb-2">
            Celebrating India's rich textile traditions
          </p>
          <p className="text-[10px] sm:text-[11px] italic text-[#8b6914] font-semibold">
            Authentic Heritage
          </p>
        </div>

        {/* RIGHT BOTTOM */}
        <div
          className={`${cardBase} rotate-[5deg] hidden sm:flex`}
          style={{ ...rightCardStyle, bottom: "0%", right: "5%" }}
        >
          <p className="text-[12px] sm:text-[14px] md:text-[15px] text-[#3d2800] mb-2">
            Crafted for today's confident women
          </p>
          <p className="text-[10px] sm:text-[11px] italic text-[#8b6914] font-semibold">
            Modern Sophistication
          </p>
        </div>

        {/* CENTER ARCH */}
        <div className="relative z-10 w-[260px] sm:w-[340px] md:w-[420px] lg:w-[500px]">
          <img
            src="/frame-arch.png"
            alt="arch"
            className="w-full h-auto object-contain"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-center text-[#1a0800] font-semibold leading-tight"
               style={{ fontSize: "clamp(22px, 4vw, 38px)" }}>
              What<br />We<br />Stand<br />For
            </p>
          </div>
        </div>

      </div>

      {/* MOBILE CARDS (stacked) */}
      <div className="sm:hidden mt-6 grid grid-cols-1 gap-4 px-6">
        {[
          "Timeless Elegance",
          "Uncompromising Quality",
          "Authentic Heritage",
          "Modern Sophistication",
        ].map((text, i) => (
          <div key={i} className="bg-[#fff6e8] p-4 rounded-lg text-center text-sm">
            {text}
          </div>
        ))}
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════
   SECTION 2 — Craft Image
═══════════════════════════════════════ */
function CraftSection() {
  return (
    <section className="w-full h-[250px] sm:h-[350px] md:h-[450px] relative overflow-hidden">
      <img
        src="/craft-bg.png"
        alt="craft"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20" />
    </section>
  );
}


/* ═══════════════════════════════════════
   SECTION 3 — Elegance
   Matches screenshot exactly:
   [elephant] | [blue line] [heading / desc / btn] | [flowers]
   [full-width balustrade strip]
═══════════════════════════════════════ */
function EleganceSection() {
  const navigate = useNavigate();
  return (
    <section className="relative bg-white overflow-hidden pt-8 md:pt-12">
      {/* ── Content Row (Elephant - Button - Flowers) ── */}
      <div className="relative flex flex-col md:flex-row items-end justify-between w-full px-6 md:px-12 lg:px-20 z-10">
        
        {/* LEFT — Golden Elephant */}
        <div className="flex-shrink-0 w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] animate-fade-in-left -mb-1 md:-mb-2">
          <img
            src="/elephantt.png"
            alt="Golden elephant"
            className="w-full h-auto object-contain drop-shadow-lg block"
          />
        </div>

        {/* CENTER — Button */}
        <div className="my-8 md:my-0 pb-10 md:pb-20 flex flex-col items-center">
          <button
            onClick={() => navigate("/products")}
            className="px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 text-white text-[11px] sm:text-[12px] md:text-[13px] tracking-[0.25em] font-semibold uppercase transition-all duration-300 hover:scale-105 shadow-xl"
            style={{ 
              backgroundColor: "#938359", 
              fontFamily: "'Outfit', sans-serif" 
            }}
          >
            EXPLORE COLLECTIONS
          </button>
        </div>

        {/* RIGHT — Hanging Flowers */}
        <div className="flex-shrink-0 w-[120px] sm:w-[160px] md:w-[200px] lg:w-[240px] self-start md:mt-[-20px]">
          <img
            src="/flowers-hanging.png"
            alt="Hanging flowers decoration"
            className="w-full h-auto object-contain block"
          />
        </div>
      </div>

      {/* ── Balustrade / Railing Strip ── */}
      <div className="relative w-full overflow-hidden -mt-8 sm:-mt-12 md:-mt-16">
        <div
          className="w-full h-[120px] sm:h-[160px] md:h-[200px] lg:h-[240px]"
          style={{
            backgroundImage: "url('/balustrade.png')",
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
            backgroundPosition: "bottom center",
            display: "block"
          }}
        />
      </div>

      <style>{`
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-left {
          animation: fade-in-left 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
}


/* ═══════════════════════════════════════
   SECTION 4 — Footer
═══════════════════════════════════════ */
function NewsletterFooter() {
  return (
    <section className="w-full">
      <img
        src="/footer.png"
        alt="footer"
        className="w-full object-cover"
      />
    </section>
  );
}


/* ═══════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════ */
export default function HomePage() {
  return (
    <div className="font-serif min-h-screen">
      <WhatWeStandFor />
      <CraftSection />
      <EleganceSection />
      <NewsletterFooter />
    </div>
  );
}