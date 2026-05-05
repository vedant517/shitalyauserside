import React from "react";

export default function CommitmentSection() {
  return (
    <>
      {/* Google Fonts — link tag only, no plain CSS */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:wght@700&family=Outfit:wght@300&display=swap"
      />

      <section className="w-full bg-white pt-7 sm:pt-9 md:pt-10 overflow-hidden">

        {/* ── HEADING ROW ─────────────────────────────────── */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5 mb-2 sm:mb-3 px-4 sm:px-6">

          {/* Left ornament — horizontally mirrored */}
          <img
            src="/images/h1.png"
            alt=""
            aria-hidden="true"
            className="w-[48px] sm:w-[70px] md:w-[100px] h-auto shrink-0 [transform:scaleX(-1)]"
          />

          {/* Title */}
          <h2
            className="text-black text-center leading-none tracking-wide shrink-0"
            style={{ fontFamily: "'Ibarra Real Nova', serif", fontWeight: 700, fontSize: "clamp(1.1rem, 2.8vw, 2.3rem)" }}
          >
            Our Commitment&nbsp;to&nbsp;You
          </h2>

          {/* Right ornament — normal */}
          <img
            src="/images/h1.png"
            alt=""
            aria-hidden="true"
            className="w-[48px] sm:w-[70px] md:w-[100px] h-auto shrink-0"
          />
        </div>

        {/* ── SUBTITLE ────────────────────────────────────── */}
        <div className="flex justify-center mb-6 sm:mb-8 md:mb-10 px-4">
          <p
            className="text-black text-center leading-relaxed max-w-[90%] sm:max-w-[580px] md:max-w-[660px]"
            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: "clamp(0.72rem, 1.3vw, 0.82rem)" }}
          >
            We are dedicated to offering more than just sarees — we deliver an experience of luxury,
            trust, and satisfaction. Every piece you choose from Sheetalya is a promise of quality,
            authenticity, and elegance.
          </p>
        </div>

        {/* ── GALLERY STRIP ────────────────────────────────── */}
        {/*
            Layout (left → right):
            [sliver a1] [a2] [a3 hero] [a4] [sliver a5]

            • gap-4 between each image
            • a1 / a5 are fixed-width slivers, vertically centred
            • a2 / a4 grow equally, 83 % of strip height, bottom-aligned
            • a3 grows slightly wider, full strip height (hero)
            • No gap at left or right edges (flush with viewport edge)
        */}
        <div className="flex items-end w-full h-[220px] sm:h-[320px] md:h-[430px] gap-1.5 sm:gap-2 md:gap-4">

          {/* Sliver — left */}
          <div className="w-[28px] sm:w-[44px] md:w-[60px] h-[75%] self-center shrink-0 overflow-hidden">
            <img
              src="/images/a1.png"
              alt="Saree collection"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Second image */}
          <div className="h-[83%] shrink-0 overflow-hidden [flex-grow:1] basis-0">
            <img
              src="/images/a2.png"
              alt="Saree collection"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Centre hero — tallest */}
          <div className="h-full shrink-0 overflow-hidden [flex-grow:1.25] basis-0">
            <img
              src="/images/a3.png"
              alt="Saree collection"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Fourth image */}
          <div className="h-[83%] shrink-0 overflow-hidden [flex-grow:1] basis-0">
            <img
              src="/images/a4.png"
              alt="Saree collection"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Sliver — right (flush with viewport edge) */}
          <div className="w-[28px] sm:w-[44px] md:w-[60px] h-[75%] self-center shrink-0 overflow-hidden">
            <img
              src="/images/a5.png"
              alt="Saree collection"
              className="w-full h-full object-cover object-center"
            />
          </div>

        </div>
      </section>
    </>
  );
}
