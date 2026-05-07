import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../Redux/api/categoryApi";

const FALLBACK_CATEGORIES = [
  { image: "/images/c1.png", label: "Royal Silks"        },
  { image: "/images/c2.png", label: "Festive Radiance"   },
  { image: "/images/c3.png", label: "Bridal Elegance"    },
  { image: "/images/c4.png", label: "Handwoven Heritage" },
];

const SkeletonCard = () => (
  <div className="flex flex-col gap-3 sm:gap-[14px] animate-pulse">
    <div
      className="w-full bg-gray-200"
      style={{ aspectRatio: "3/4.2", borderRadius: 2 }}
    />
    <div className="h-3 bg-gray-200 rounded w-2/3" />
  </div>
);

const ExploreCategorySection = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);                         
  const { data: apiCategories, isLoading, isError } = useGetCategoriesQuery();

  const categories = React.useMemo(() => {
    if (isLoading || isError || !apiCategories?.length) return FALLBACK_CATEGORIES;

    return apiCategories.map((cat, idx) => ({
      label: cat.name ?? cat.title ?? `Category ${idx + 1}`,
      image:
        cat.image?.url ??
        cat.image ??
        cat.imageUrl ??
        FALLBACK_CATEGORIES[idx % FALLBACK_CATEGORIES.length].image,
      slug: cat.slug ?? cat._id ?? null,
    }));
  }, [apiCategories, isLoading, isError]);

  const visibleCategories = showAll ? categories : categories.slice(0, 4);

  const handleCategoryClick = (cat) => {
    if (cat.slug) {
      navigate(`/products?category=${encodeURIComponent(cat.slug)}`);
    } else {
      navigate(`/products?category=${encodeURIComponent(cat.label)}`);
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:wght@400;500&family=Outfit:wght@300;400;500&display=swap"
      />

      <section className="bg-[#fffff] px-4 sm:px-6 md:px-10 pt-10 sm:pt-14 md:pt-16 pb-[52px] sm:pb-[60px] md:pb-[72px]">

        
        <div className="flex items-center justify-center gap-3 sm:gap-[18px] mb-[10px] flex-wrap">
          <img
            src="/images/h1.png"
            alt=""
            aria-hidden="true"
            className="h-5 sm:h-6 md:h-7 w-auto object-contain opacity-85 [transform:scaleX(-1)]"
          />
          <h2
            className="font-['Ibarra_Real_Nova',serif] font-normal text-[clamp(1.6rem,4vw,2.75rem)] text-[#1a1008] tracking-[-0.01em] leading-none text-center"
          >
            Explore by Category
          </h2>
          <img
            src="/images/h1.png"
            alt=""
            aria-hidden="true"
            className="h-5 sm:h-6 md:h-7 w-auto object-contain opacity-85"
          />
        </div>

        {/* ── Subtitle ── */}
        <p className="text-center font-['Outfit',sans-serif] font-normal text-[clamp(0.8rem,1.4vw,0.95rem)] text-[#1a1008] tracking-[0.01em] mb-8 sm:mb-10 md:mb-12 px-2 sm:px-0">
          Discover sarees crafted for every occasion, mood, and moment of elegance.
        </p>

        {/* ── Category grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 w-full mb-10 md:mb-12">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : visibleCategories.map((cat) => (                           
                <div
                  key={cat.label}
                  onClick={() => handleCategoryClick(cat)}
                  className="flex flex-col gap-3 sm:gap-[14px] cursor-pointer"
                >
                  {/* Ornate gold frame */}
                  <div className="relative aspect-[3/4.2] overflow-visible">
                    <div className="w-full h-full overflow-hidden shadow-[0_0_0_2.5px_#b8922a,0_0_0_5px_#e8d9a8,0_0_0_8px_#b8922a,0_0_0_10px_#e8d9a8,0_0_0_12px_#b8922a,0_2px_18px_rgba(0,0,0,0.22)]">
                      <img
                        src={cat.image}
                        alt={cat.label}
                        className="w-full h-full object-cover block"
                        onError={(e) => {
                          e.currentTarget.src =
                            FALLBACK_CATEGORIES[
                              categories.indexOf(cat) % FALLBACK_CATEGORIES.length
                            ].image;
                        }}
                      />
                    </div>
                  </div>

                  {/* Label */}
                  <div className="flex items-center gap-2 sm:gap-[10px] font-['Outfit',sans-serif] font-normal text-[clamp(0.8rem,1.2vw,0.95rem)] text-[#1a1008] tracking-[0.01em] pl-[2px]">
                    {cat.label}
                    <span className="inline-flex items-center">→</span>
                  </div>
                </div>
              ))}
        </div>

       
        {!showAll && (                                                   
          <div className="flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="font-['Outfit',sans-serif] font-normal text-[11px] sm:text-[12px] tracking-[0.2em] uppercase text-[#1a1008] bg-transparent border border-[#1a1008] px-7 sm:px-9 py-3 cursor-pointer transition-[background,color] duration-[250ms] ease-in-out hover:bg-[#1a1008] hover:text-[#f5f0e4]"
            >
              View All →
            </button>
          </div>
        )}

      </section>
    </>
  );
};

export default ExploreCategorySection;