import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const PRODUCT = {
  id: 1,
  brand: "Silk Sarees",
  name: "Royal Kanjivaram Silk Saree",
  price: 18499,
  mrp: 19499,
  description:
    "Crafted with exquisite precision, this Royal Kanjivaram Silk Saree is a celebration of traditional artistry and refined elegance. Woven from the finest Silk threads — the iconic zari border, jaw-dropping rich border that adds a regal touch to every drape.",
  colors: [
    { name: "Yellow", hex: "#e8b84b" },
    { name: "Wine", hex: "#8b1a1a" },
    { name: "Pink", hex: "#d4788a" },
  ],
  images: [
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80",
    "https://images.unsplash.com/photo-1594938298603-c8148c4b4e8e?w=600&q=80",
  ],
};

const RELATED = [
  { name: "Royal Kanjivaram Silk",       price: 18499, img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80" },
  { name: "Royal Kanjivaram Saree",      price: 20499, img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=80" },
  { name: "Royal Kanjivaram Taree",      price: 15999, img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80" },
  { name: "Royal Kanjivaram Saree",      price: 18499, img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e8e?w=400&q=80" },
  { name: "Royal Kanjivaram Silk Saree", price: 21999, img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80" },
];

function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e8d5b5]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3 sm:py-[13px] bg-transparent border-none cursor-pointer outline-none"
      >
        <span
          className="text-[10px] sm:text-[11px] tracking-[0.18em] text-[#3d1a00] font-semibold text-left"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          {title}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#c9973a"
          strokeWidth="2"
          className="transition-transform duration-200 flex-shrink-0 ml-2"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0" }}
      >
        <p
          className="text-[13px] sm:text-[14px] text-[#666] leading-[1.7] pb-[13px] m-0"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          {children}
        </p>
      </div>
    </div>
  );
}

export default function ProductDetail({ onAddToCart, onOpenCart }) {
  const navigate = useNavigate();

  const [mainImg, setMainImg]     = useState(0);
  const [selectedColor, setColor] = useState("Wine");
  const [addedAnim, setAddedAnim] = useState(false);
  const [buyHov, setBuyHov]       = useState(false);

  const discount = Math.round((1 - PRODUCT.price / PRODUCT.mrp) * 100);

  const handleAddToCart = () => {
    const cartItem = {
      id: PRODUCT.id,
      name: PRODUCT.name,
      price: PRODUCT.price,
      mrp: PRODUCT.mrp,
      color: selectedColor,
      colorHex: PRODUCT.colors.find((c) => c.name === selectedColor)?.hex,
      image: PRODUCT.images[mainImg],
      quantity: 1,
    };
    if (onAddToCart) onAddToCart(cartItem);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1000);
    if (onOpenCart) onOpenCart();
  };

  const handleBuyNow = () => {
    const cartItem = {
      id: PRODUCT.id,
      name: PRODUCT.name,
      price: PRODUCT.price,
      mrp: PRODUCT.mrp,
      color: selectedColor,
      colorHex: PRODUCT.colors.find((c) => c.name === selectedColor)?.hex,
      image: PRODUCT.images[mainImg],
      quantity: 1,
    };
    if (onAddToCart) onAddToCart(cartItem);
    navigate("/checkout");
  };

  return (
    <div className="bg-white min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Playfair+Display:wght@400;600;700&family=Cormorant+Garamond:wght@400;500;600&display=swap');
        .pd-related-img { transition: transform 0.3s; }
        .pd-related:hover .pd-related-img { transform: scale(1.05); }
      `}</style>

      {/* NAVBAR */}
      <Navbar />

      {/* ── Main layout ── */}
      <div className="max-w-[1160px] mx-auto px-3 sm:px-6 md:px-10 pt-20 sm:pt-24 pb-8">

        {/* 2-col grid: stacks on mobile, side-by-side on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 items-start">

          {/* LEFT — images */}
          <div className="flex gap-2 sm:gap-3">

            {/* Thumbnails — hidden on very small, show from sm */}
            <div className="hidden sm:flex flex-col gap-2 flex-shrink-0">
              {PRODUCT.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImg(i)}
                  className="w-[56px] h-[68px] md:w-[68px] md:h-[80px] rounded overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-200"
                  style={{
                    border: `2px solid ${i === mainImg ? "#c9973a" : "#e8d5b5"}`,
                  }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover block" />
                </div>
              ))}
              <div className="flex flex-col items-center gap-[2px] pt-1">
                <span className="text-[9px] text-[#c9973a]">▲</span>
                <span className="text-[9px] text-[#c9973a]">▼</span>
              </div>
            </div>

            {/* Main image */}
            <div className="flex-1 rounded-md overflow-hidden bg-[#f5ece0] relative">
              <img
                src={PRODUCT.images[mainImg]}
                alt={PRODUCT.name}
                className="w-full object-cover block transition-opacity duration-300"
                style={{ aspectRatio: "3/4" }}
              />
              {/* Discount badge */}
              <div
                className="absolute top-2 sm:top-3 left-2 sm:left-3 text-white text-[8px] sm:text-[9px] tracking-[0.1em] px-2 sm:px-[10px] py-[3px] rounded-sm"
                style={{
                  fontFamily: '"Cinzel", serif',
                  background: "linear-gradient(135deg,#c9973a,#e8c46a)",
                }}
              >
                {discount}% OFF
              </div>
              {/* Wishlist */}
              <button className="absolute top-2 sm:top-3 right-2 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border-none cursor-pointer flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.1)] outline-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9973a" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile thumbnail strip — only visible on xs */}
          <div className="flex sm:hidden gap-2 overflow-x-auto pb-1 -mt-2">
            {PRODUCT.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setMainImg(i)}
                className="flex-shrink-0 w-[54px] h-[64px] rounded overflow-hidden cursor-pointer"
                style={{
                  border: `2px solid ${i === mainImg ? "#c9973a" : "#e8d5b5"}`,
                }}
              >
                <img src={img} alt="" className="w-full h-full object-cover block" />
              </div>
            ))}
          </div>

          {/* RIGHT — product info */}
          <div>
            <p
              className="text-[10px] tracking-[0.25em] text-[#c9973a] mb-2 mt-0"
              style={{ fontFamily: '"Cinzel", serif' }}
            >
              {PRODUCT.brand}
            </p>

            <h1
              className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold text-[#1a0800] leading-tight mb-3 mt-0"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              {PRODUCT.name}
            </h1>

            <div className="flex items-baseline gap-2 sm:gap-3 mb-4 flex-wrap">
              <span
                className="text-[20px] sm:text-[22px] font-bold text-[#1a0800]"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                ₹{PRODUCT.price.toLocaleString("en-IN")}
              </span>
              <span
                className="text-[14px] sm:text-[15px] text-[#bbb] line-through"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                ₹{PRODUCT.mrp.toLocaleString("en-IN")}
              </span>
              <span
                className="text-[11px] sm:text-[12px] text-white px-2 py-[2px] rounded-sm"
                style={{
                  fontFamily: '"Cinzel", serif',
                  background: "linear-gradient(135deg,#c9973a,#e8c46a)",
                }}
              >
                {discount}% OFF
              </span>
            </div>

            <p
              className="text-[14px] sm:text-[15px] text-[#555] leading-[1.75] mb-5 mt-0"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              {PRODUCT.description}
            </p>

            <div
              className="h-px mb-5"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(201,151,58,0.4),transparent)",
              }}
            />

            {/* Color picker */}
            <div className="mb-5 sm:mb-6">
              <p
                className="text-[10px] tracking-[0.18em] text-[#3d1a00] mb-[10px] mt-0"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                COLOR:{" "}
                <span className="text-[#c9973a]">{selectedColor}</span>
              </p>
              <div className="flex gap-[10px]">
                {PRODUCT.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    title={c.name}
                    className="w-[26px] h-[26px] rounded-full cursor-pointer border-none transition-all duration-200 shadow-[0_1px_4px_rgba(0,0,0,0.15)] outline-none"
                    style={{
                      background: c.hex,
                      border:
                        selectedColor === c.name
                          ? "2.5px solid #c9973a"
                          : "2px solid transparent",
                      outline:
                        selectedColor === c.name
                          ? "2px solid rgba(201,151,58,0.3)"
                          : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* CTA buttons — stack on xs, row from sm */}
            <div className="flex flex-col xs:flex-row gap-3 mb-5 sm:mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-[13px] sm:py-[14px] text-[#e8c46a] text-[9px] sm:text-[10px] tracking-[0.2em] font-bold border-none rounded-sm cursor-pointer transition-all duration-300 outline-none"
                style={{
                  fontFamily: '"Cinzel", serif',
                  background: addedAnim
                    ? "linear-gradient(135deg,#2d7a2d,#3da53d)"
                    : "linear-gradient(135deg,#3d1a00,#7a3d00)",
                }}
              >
                {addedAnim ? "✓ ADDED" : "ADD TO CART"}
              </button>
              <button
                onClick={handleBuyNow}
                onMouseEnter={() => setBuyHov(true)}
                onMouseLeave={() => setBuyHov(false)}
                className="flex-1 py-[13px] sm:py-[14px] text-[9px] sm:text-[10px] tracking-[0.2em] font-semibold rounded-sm cursor-pointer transition-all duration-200 outline-none"
                style={{
                  fontFamily: '"Cinzel", serif',
                  border: "1.5px solid #c9973a",
                  background: buyHov ? "#c9973a" : "transparent",
                  color: buyHov ? "#fff" : "#3d1a00",
                }}
              >
                BUY NOW →
              </button>
            </div>

            <AccordionItem title="PRODUCT DETAILS">
              Fabric: Pure Kanjivaram Silk · Weight: 750g approx · Length: 6.3 meters with blouse piece · Zari: Real gold zari work · Occasion: Wedding, Festivals, Special Events · Care: Dry clean only
            </AccordionItem>
            <AccordionItem title="DELIVERY & RETURNS">
              Free shipping on all orders above ₹999. Estimated delivery: 5–7 business days. Easy 7-day returns for unused items in original packaging.
            </AccordionItem>
            <AccordionItem title="DISCLAIMER">
              Colors may slightly vary due to photographic lighting. The saree is a handwoven product; minor irregularities are characteristic of authentic handloom work.
            </AccordionItem>
          </div>
        </div>
      </div>

      {/* YOU MAY LIKE */}
      <div className="max-w-[1160px] mx-auto px-3 sm:px-6 md:px-10 pb-10">
        <div className="flex items-center justify-center mb-5 sm:mb-7">
          <img
            src="/youmaylike.png"
            alt="you may like divider"
            className="w-full max-w-[320px] sm:max-w-[500px] md:max-w-[700px] h-[36px] sm:h-[48px] object-contain"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {RELATED.map((p, i) => (
            <div key={i} className="pd-related cursor-pointer">
              <div
                className="relative rounded overflow-hidden bg-[#f5ece0]"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="pd-related-img w-full h-full object-cover block"
                />
                <button className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border-none cursor-pointer flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.12)] outline-none">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#c9973a" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 bg-white/90 rounded-xl px-[6px] py-[2px] flex items-center gap-[3px]">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="#f5a623">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span
                    className="text-[10px] sm:text-[11px] text-[#333]"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    4.{Math.max(1, 5 - i)}
                  </span>
                </div>
              </div>
              <p
                className="text-[12px] sm:text-[13px] text-[#1a0800] font-semibold mt-1.5 sm:mt-2 mb-[3px] leading-snug"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                {p.name}
              </p>
              <p
                className="text-[13px] sm:text-[14px] text-[#3d1a00] font-bold m-0"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                ₹{p.price.toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* NEWSLETTER FOOTER */}
      <section className="w-full mt-4 sm:mt-6">
        <img
          src="/footer.png"
          alt="Collection Banner"
          className="w-full h-auto object-cover block"
        />
      </section>
    </div>
  );
}