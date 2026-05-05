import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { image: "/images/c1.png", label: "Royal Silks"        },
  { image: "/images/c2.png", label: "Festive Radiance"   },
  { image: "/images/c3.png", label: "Bridal Elegance"    },
  { image: "/images/c4.png", label: "Handwoven Heritage" },
];

const ExploreCategorySection = () => {
  const navigate = useNavigate();

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:wght@400;500&family=Outfit:wght@300;400;500&display=swap"
      />

      <section className="bg-[#fffff] px-4 sm:px-6 md:px-10 pt-10 sm:pt-14 md:pt-16 pb-[52px] sm:pb-[60px] md:pb-[72px]">

        {/* ── Heading row ── */}
        <div className="flex items-center justify-center gap-3 sm:gap-[18px] mb-[10px] flex-wrap">
          <img src="/images/h1.png" alt="" aria-hidden="true" className="h-5 sm:h-6 md:h-7 w-auto object-contain opacity-85 [transform:scaleX(-1)]" />
          
          <h2 className="font-['Ibarra_Real_Nova',serif] font-normal text-[clamp(1.6rem,4vw,2.75rem)] text-[#1a1008] tracking-[-0.01em] leading-none text-center">
            Explore by Category
          </h2>

          <img src="/images/h1.png" alt="" aria-hidden="true" className="h-5 sm:h-6 md:h-7 w-auto object-contain opacity-85" />
        </div>

        {/* ── Subtitle ── */}
        <p className="text-center font-['Outfit',sans-serif] font-normal text-[clamp(0.8rem,1.4vw,0.95rem)] text-[#1a1008] tracking-[0.01em] mb-8 sm:mb-10 md:mb-12 px-2 sm:px-0">
          Discover sarees crafted for every occasion, mood, and moment of elegance.
        </p>

        {/* ── Category grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 w-full mb-10 md:mb-12">
          {categories.map(({ image, label }) => (
            
            <div
              key={label}
              onClick={() => navigate("/products")}
              className="flex flex-col gap-3 sm:gap-[14px] cursor-pointer"
            >

              {/* Ornate gold frame */}
              <div className="relative aspect-[3/4.2] overflow-visible">
                <div className="w-full h-full overflow-hidden shadow-[0_0_0_2.5px_#b8922a,0_0_0_5px_#e8d9a8,0_0_0_8px_#b8922a,0_0_0_10px_#e8d9a8,0_0_0_12px_#b8922a,0_2px_18px_rgba(0,0,0,0.22)]">
                  <img
                    src={image}
                    alt={label}
                    className="w-full h-full object-cover block"
                  />
                </div>
              </div>

              {/* Label */}
              <div className="flex items-center gap-2 sm:gap-[10px] font-['Outfit',sans-serif] font-normal text-[clamp(0.8rem,1.2vw,0.95rem)] text-[#1a1008] tracking-[0.01em] pl-[2px]">
                {label}
                <span className="inline-flex items-center">→</span>
              </div>

            </div>
          ))}
        </div>

        {/* ── View All button ── */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/products")}
            className="font-['Outfit',sans-serif] font-normal text-[11px] sm:text-[12px] tracking-[0.2em] uppercase text-[#1a1008] bg-transparent border border-[#1a1008] px-7 sm:px-9 py-3 cursor-pointer transition-[background,color] duration-[250ms] ease-in-out hover:bg-[#1a1008] hover:text-[#f5f0e4]"
          >
            View All →
          </button>
        </div>

      </section>
    </>
  );
};

export default ExploreCategorySection;
