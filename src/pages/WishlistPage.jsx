import React, { useState } from "react";
import { Heart, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import NewsletterFooter from "../components/NewsLetterFooter";

const products = [
  {
    id: 1,
    name: "Royal Kanjivaram Silk Saree...",
    price: 18499,
    mrp: 18499,
    discount: 20,
    image: "/images/s1.jpg",
  },
  {
    id: 2,
    name: "Royal Kanjivaram Silk Saree...",
    price: 18499,
    mrp: 18499,
    discount: 20,
    image: "/images/s2.jpg",
  },
  {
    id: 3,
    name: "Royal Kanjivaram Silk Saree...",
    price: 18499,
    mrp: 18499,
    discount: 40,
    image: "/images/s3.jpg",
  },
  {
    id: 4,
    name: "Royal Kanjivaram Silk Saree...",
    price: 18499,
    mrp: 18499,
    discount: 20,
    image: "/images/s4.jpg",
  },
];

const WishlistPage = () => {
  const navigate = useNavigate();
  const [wished, setWished] = useState(products.map((p) => p.id));
  const [sortOpen, setSortOpen] = useState(false);
  const [sortLabel, setSortLabel] = useState("SORT BY");

  const sortOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Newest First",
    "Popular",
  ];

  const toggleWish = (id) => {
    setWished((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:wght@400;500;600&family=Outfit:wght@300;400;500&display=swap"
      />

      <Navbar />

      <div
        className="min-h-screen bg-white pt-[72px]"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">

          {/* ── Header row ── */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h1
              className="text-[22px] sm:text-[26px] md:text-[28px] font-normal text-black"
              style={{ fontFamily: "'Ibarra Real Nova', serif" }}
            >
              Your Wishlist
            </h1>

            <div className="flex items-center gap-3 sm:gap-6">
              <span className="hidden xs:block text-[11px] sm:text-[13px] tracking-[0.1em] text-[#1a1008] uppercase">
                {products.length * 8 + 2} Looks
              </span>

              <div className="relative">
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  className="flex items-center gap-1.5 text-[11px] sm:text-[13px] tracking-[0.1em] uppercase text-[#1a1008] hover:text-[#c8a05a] transition-colors"
                >
                  {sortLabel}
                  <ChevronDown size={13} />
                </button>

                {sortOpen && (
                  <div className="absolute right-0 top-7 bg-white border border-[#e8dcc8] rounded shadow-md z-20 min-w-[160px] sm:min-w-[180px]">
                    {sortOptions.map((opt) => (
                      <div
                        key={opt}
                        onClick={() => {
                          setSortLabel(opt);
                          setSortOpen(false);
                        }}
                        className="px-3 sm:px-4 py-2.5 sm:py-3 text-[12px] sm:text-[13px] text-[#1a1008] hover:bg-[#FFF5E2] cursor-pointer transition-colors"
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Product grid ── */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col group cursor-pointer"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                {/* ── Image card (no badge inside) ── */}
                <div
                  className="relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    border: "2px solid transparent",
                    transition: "border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#87CEEB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[220px] xs:h-[260px] sm:h-[300px] md:h-[320px] lg:h-[340px] object-cover"
                  />

                  {/* Heart — top right */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWish(product.id);
                    }}
                    className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex items-center justify-center transition-all hover:scale-110"
                  >
                    <Heart
                      size={17}
                      fill={wished.includes(product.id) ? "#FB2E86" : "none"}
                      stroke={wished.includes(product.id) ? "#FB2E86" : "#fff"}
                      strokeWidth={1.8}
                    />
                  </button>
                </div>

                {/* ── Text info below image ── */}
                <div className="mt-2.5 sm:mt-3 px-0.5">

                  {/* Product name */}
                  <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#1a1008] font-normal leading-snug mb-1.5 truncate">
                    {product.name}
                  </p>

                  {/* Price + discount badge on same row, badge right-aligned */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-[13px] sm:text-[14px] md:text-[15px] font-normal text-[#1a1008]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[11px] sm:text-[12px] text-[#aaa] line-through">
                        ₹{product.mrp.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Discount badge — below image, right side */}
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#785822] text-white text-[9px] sm:text-[10px] font-medium flex items-center justify-center shrink-0">
                      {product.discount}%
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
        <NewsletterFooter/>
      </div>
      
    </>
  );
};

export default WishlistPage;
