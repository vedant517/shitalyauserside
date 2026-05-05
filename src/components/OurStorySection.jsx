import React from "react";
import { useNavigate } from "react-router-dom";
const OurStorySection = () => {
  const navigate = useNavigate();
  return (
    <section
      className="relative w-full bg-white py-10 sm:py-12 md:py-16 px-4"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* ── Full ornate border frame — all 4 sides visible ── */}
      <div
        className="absolute inset-2 sm:inset-3 md:inset-4 pointer-events-none"
        style={{
          backgroundImage: `url(images/border.jpg)`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />
      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[360px] md:min-h-[420px] px-4">
        {/* ── Our Story heading with h1.png ornaments ── */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-5 sm:mb-6 md:mb-8">
          {/* Left ornament — flipped outward */}
          <img
            src="images/h1.png"
            alt=""
            aria-hidden="true"
            className="h-4 sm:h-5 md:h-7 w-auto object-contain opacity-80"
            style={{ transform: "scaleX(-1)" }}
          />
          <h2
            className="text-[22px] sm:text-[26px] md:text-[32px] font-normal text-black leading-none"
            style={{ fontFamily: "'Ibarra Real Nova', serif" }}
          >
            Our Story
          </h2>
          {/* Right ornament — explicitly normal (opposite of left) */}
          <img
            src="images/h1.png"
            alt=""
            aria-hidden="true"
            className="h-4 sm:h-5 md:h-7 w-auto object-contain opacity-80"
            style={{ transform: "scaleX(1)" }}
          />
        </div>
        {/* ── Body text — 4 lines ── */}
        <p
          className="text-center text-[12px] sm:text-[13px] md:text-[14px] font-light leading-[1.9] text-[#2a2a2a] max-w-[280px] sm:max-w-[360px] md:max-w-[440px] mb-7 sm:mb-8 md:mb-10"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          At Sheetalya, we believe that a saree is more than just a garment — it is an
          expression of grace, heritage, and individuality. Rooted in the rich traditions of
          Indian craftsmanship, our journey began with a vision to bring timeless elegance
          into the modern woman's wardrobe.
        </p>
        {/* ── Explore Collections button ── */}
        <button
          onClick={() => navigate("/products")}
          className="px-7 sm:px-8 md:px-10 py-2.5 sm:py-3 text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-white transition-opacity duration-200 hover:opacity-80"
          style={{ backgroundColor: "#938359", fontFamily: "'Outfit', sans-serif" }}
        >
          Explore Collections
        </button>
      </div>
      {/* ── Woman image — bottom left, inside border frame ── */}
      <img
        src="images/w1.jpg"
        alt=""
        aria-hidden="true"
        className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-3 sm:left-4 md:left-5 h-[140px] sm:h-[210px] md:h-[300px] w-auto object-contain pointer-events-none"
        style={{ transform: "scaleX(-1)", zIndex: 1 }}
      />
      {/* ── Woman image — bottom right, inside border frame ── */}
      <img
        src="images/w1.jpg"
        alt=""
        aria-hidden="true"
        className="absolute bottom-3 sm:bottom-4 md:bottom-5 right-3 sm:right-4 md:right-5 h-[140px] sm:h-[210px] md:h-[300px] w-auto object-contain pointer-events-none"
        style={{ zIndex: 1 }}
      />
    </section>
  );
};
export default OurStorySection;
