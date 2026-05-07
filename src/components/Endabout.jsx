import React from "react";

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
  return (
    <section className="relative bg-white overflow-hidden">

      {/* ── Three-column content row ── */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-0 md:px-0 py-10 md:py-14 gap-0">

        {/* LEFT — elephant */}
        <div className="flex-shrink-0 w-[200px] md:w-[260px] lg:w-[310px] flex items-center justify-center px-4">
          <img
            src="/elephantt.png"
            alt="Golden elephant"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* CENTER — vertical blue rule + copy block */}
        <div className="flex items-center gap-5 md:gap-7 flex-1 justify-center px-4">

          {/* Thin vertical navy/steel-blue divider */}
          <div className="hidden sm:block self-stretch w-[3px] rounded-full bg-[#2e5fa3] min-h-[120px]" />

          {/* Text block */}
          <div className="text-left max-w-[380px]">
            <h2
              className="text-[26px] sm:text-[30px] md:text-[38px] lg:text-[42px] font-semibold text-[#1a0800] leading-[1.18] mb-4"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Step Into Timeless Elegance
            </h2>

            <p
              className="text-[#5a3d1e] text-[13px] md:text-[14px] leading-relaxed mb-6"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
            >
              Explore our collection and discover sarees that<br className="hidden md:block" /> celebrate your unique style.
            </p>

            <button
              className="px-7 md:px-9 py-2.5 md:py-3 text-white text-[10px] md:text-[11px] tracking-[0.22em] uppercase transition-opacity duration-200 hover:opacity-85"
              style={{ backgroundColor: "#7a6244", fontFamily: "'Outfit', sans-serif" }}
            >
              EXPLORE COLLECTIONS
            </button>
          </div>
        </div>

        {/* RIGHT — hanging flowers */}
        <div className="flex-shrink-0 w-[200px] md:w-[260px] lg:w-[310px] flex items-flex-start justify-center px-4 self-start">
          <img
            src="/flowers-hanging.png"
            alt="Hanging flowers decoration"
            className="w-full h-auto object-contain"
          />
        </div>

      </div>

      {/* ── Full-width repeating balustrade ── */}
      <div
        className="w-full h-[90px] sm:h-[120px] md:h-[150px]"
        style={{
          backgroundImage: "url('/balustrade.png')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "bottom center",
        }}
      />
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