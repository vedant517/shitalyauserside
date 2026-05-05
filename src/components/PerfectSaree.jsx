import { useState } from 'react';

export default function PerfectSaree() {
  return (
    <section className="relative bg-white overflow-hidden min-h-[400px] sm:min-h-[450px] md:min-h-[500px] flex items-end">

      {/* LEFT MODEL */}
      <img
        src="/msaree.png"
        alt=""
        className="
          hidden md:block
          absolute left-0 bottom-0
          w-[16vw] min-w-[140px] max-w-[220px]
          lg:min-w-[180px] lg:max-w-[260px]
          z-[2] pointer-events-none
        "
      />

      {/* RIGHT MODEL */}
      <img
        src="/left.png"
        alt=""
        className="
          hidden md:block
          absolute right-0 bottom-0
          w-[16vw] min-w-[120px] max-w-[200px]
          lg:min-w-[160px] lg:max-w-[260px]
          z-[2] pointer-events-none
        "
      />

      {/* MAIN CONTENT */}
      <div className="
        relative z-[3]
        w-full max-w-[1100px]
        mx-auto
        flex flex-col md:flex-row
        items-center md:items-end
        justify-center
        gap-6 sm:gap-8 md:gap-10
        px-4 sm:px-6 md:px-10
        pt-10 sm:pt-12 md:pt-16 pb-8 sm:pb-10
      ">

        {/* ARCH IMAGE */}
        <div className="relative w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px]">

          <div>
            <img
              src="/modelsaree.jpg"
              alt=""
              className="mb-[50px] sm:mb-[60px] md:mb-[70px] w-[180px] h-[220px] sm:w-[220px] sm:h-[270px] md:w-[250px] md:h-[300px] object-cover object-top"
            />
          </div>

          {/* TOP FRAME */}
          <img
            src="/half.png"
            alt=""
            className="
              absolute left-1/2 -translate-x-1/2
              top-[-5%] ml-[-25px] sm:ml-[-30px] md:ml-[-35px]
              w-[220px] sm:w-[260px] md:w-[300px]
              object-contain pointer-events-none
            "
          />

          {/* BOTTOM FRAME */}
          <img
            src="/bottomhalf.png"
            alt=""
            className="
              absolute left-1/2 -translate-x-1/2
              bottom-[36px] sm:bottom-[44px] md:bottom-[50px]
              ml-[-25px] sm:ml-[-30px] md:ml-[-35px]
              w-[220px] sm:w-[260px] md:w-[300px]
              object-contain pointer-events-none
            "
          />
        </div>

        {/* TEXT CONTENT */}
        <div className="flex flex-col items-center text-center gap-3 sm:gap-4 mb-[40px] sm:mb-[50px] md:mb-[60px]">

          {/* HEADING */}
          <h2
            className="text-[#1a0a00] leading-[1.2]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.5rem, 6vw, 3rem)',
            }}
          >
            Your Perfect Saree
            <br />
            <span className="font-normal">
              Awaits
            </span>
          </h2>

          {/* TEXT */}
          <p
            className="text-[#7a5233] max-w-[280px] sm:max-w-[300px] md:max-w-[320px]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '16px',
            }}
          >
            Find the drape that complements your style, your story, and your elegance.
          </p>

          {/* BUTTON */}
          <button className="
            px-6 sm:px-7 md:px-8 py-[10px] sm:py-3 bg-[#6b5b45] text-white text-[10px]
            tracking-[0.28em] uppercase font-semibold
            hover:bg-[#5a4a36] transition
          ">
            START BROWSING →
          </button>

        </div>

      </div>
    </section>
  );
}