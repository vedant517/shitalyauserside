
import React from "react";
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:wght@400;500&family=Outfit:wght@300;400;500&display=swap"
      />

      <section
        className="relative w-full min-h-[620px] sm:min-h-[680px] bg-cover bg-center bg-no-repeat flex items-start justify-center pt-14 sm:pt-16 pb-0 px-6 sm:px-10 overflow-hidden"
        style={{ backgroundImage: `url("images/p4.jpg")` }}
      >
        {/* very light warm wash so text stays readable */}
        <div className="absolute inset-0 bg-[#f5ead4]/30 pointer-events-none" />

        {/* ── text block — upper half only ── */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-[720px] w-full">

          {/* About Us label */}
          <p className="font-['Outfit',sans-serif] font-normal text-[12px] sm:text-[13px] tracking-[0.22em] uppercase text-[#938359] mb-1">
            About Us
          </p>

          {/* thin rule under label */}
          <span className="block w-6 h-px bg-[#938359] mb-5" />

          {/* heading row with h1 dividers */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 flex-wrap">
           <img
  src="images/h1.png"
  alt=""
  aria-hidden="true"
  className="h-7 w-auto object-contain opacity-80 -scale-x-100"
/>

            <h2 className="font-['Ibarra_Real_Nova',serif] font-normal text-[clamp(1.6rem,4vw,2.6rem)] text-[#1a1008] tracking-[-0.01em] leading-none text-center">
              A Story Woven in Elegance
            </h2>

           <img
  src="images/h1.png"
  alt=""
  aria-hidden="true"
  className="h-7 w-auto object-contain opacity-80 scale-x-100"
/>
          </div>

          {/* body text */}
          <p className="font-['Outfit',sans-serif] font-light text-[clamp(0.82rem,1.4vw,0.95rem)] text-[#1a1008] leading-[1.8] tracking-[0.01em] max-w-[640px] px-2 sm:px-0 mb-8">
            At Sheetalya, we believe a saree is more than just attire it is a symbol of grace, heritage, and
            individuality. Rooted in the richness of Indian craftsmanship, our collections are thoughtfully
            curated to celebrate the beauty of tradition with a modern touch.
          </p>

          {/* READ MORE button */}
          <button
            onClick={() => navigate("/about")}
            className="font-['Outfit',sans-serif] font-normal text-[11px] tracking-[0.22em] uppercase text-[#1a1008] bg-transparent border border-[#1a1008] px-7 sm:px-9 py-3 cursor-pointer transition-[background,color] duration-[250ms] ease-in-out hover:bg-[#1a1008] hover:text-[#f5ead4]"
          >
            Read More →
          </button>

        </div>
      </section>
    </>
  );
};

export default AboutSection;