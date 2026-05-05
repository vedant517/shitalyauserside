import { useState } from 'react';
import ProductCard from './ProductCard';

const PRODUCTS = [
  { id: 1, name: 'Royal Kanjivaram Silk Saree',   price: 18499, mrp: 19499, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80' },
  { id: 2, name: 'Pure Banarasi Silk Saree',       price: 22999, mrp: 24999, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=80' },
  { id: 3, name: 'Kanjivaram Wedding Saree',       price: 15999, mrp: 17999, image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80' },
  { id: 4, name: 'Handloom Silk Saree',            price: 18499, mrp: 20499, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e8e?w=400&q=80' },
  { id: 5, name: 'Royal Kanjivaram Silk Saree II', price: 21999, mrp: 23999, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80' },
  { id: 6, name: 'Traditional Mysore Silk',        price: 13999, mrp: 15999, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=80' },
  { id: 7, name: 'Zari Border Silk Saree',         price: 16499, mrp: 18499, image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80' },
  { id: 8, name: 'Bridal Kanjivaram Saree',        price: 24999, mrp: 27999, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e8e?w=400&q=80' },
];

function Flourish({ flip = false }) {
  return (
    <svg
      width="90" height="32" viewBox="0 0 90 32" fill="none"
      className={`${flip ? 'scale-x-[-1]' : ''} shrink-0 block max-sm:w-[60px]`}
    />
  );
}

function ElephantStrip() {
  const TOTAL = 12;
  const half = TOTAL / 2;
  return (
    <div className="bg-white border-t border-[rgba(201,151,58,0.18)] overflow-hidden py-[10px] mt-8 flex justify-center">
      <div className="flex items-center flex-nowrap">
        {Array(TOTAL).fill(0).map((_, i) => (
          <img
            key={i}
            src="/elephantt.png"
            alt=""
            className={`h-[50px] w-[44px] mx-[8px] mt-[20px] block shrink-0
              sm:h-[60px] sm:w-[52px] sm:mx-[10px] sm:mt-[28px]
              md:h-[70px] md:w-[60px] md:mx-[10px] md:mt-[30px]
              lg:h-[90px] lg:w-[80px] lg:mx-[16px] lg:mt-[50px]
              ${i < half ? '' : 'scale-x-[-1]'}`}
          />
        ))}
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white pt-[130%] rounded-sm bg-gradient-to-r from-[#f5e8d0] via-[#faf0dc] to-[#f5e8d0] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
  );
}

function ArrowBtn({ direction, onClick, disabled }) {
  const [hov, setHov] = useState(false);
  const isLeft = direction === 'prev';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`absolute top-1/2 -translate-y-1/2 z-30
        w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] md:w-[34px] md:h-[34px]
        rounded-full flex items-center justify-center
        ${isLeft
          ? 'left-[-8px] sm:left-[-12px] md:left-[-20px]'
          : 'right-[-8px] sm:right-[-12px] md:right-[-20px]'}
        ${disabled ? 'opacity-30 border bg-white' : 'border shadow-md'}
        ${hov && !disabled ? 'bg-[#c9973a]' : 'bg-white/95'}
      `}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        {isLeft ? (
          <path d="M8.5 2L4 6.5L8.5 11" stroke={hov ? '#fff' : '#c9973a'} strokeWidth="1.8" />
        ) : (
          <path d="M4.5 2L9 6.5L4.5 11" stroke={hov ? '#fff' : '#c9973a'} strokeWidth="1.8" />
        )}
      </svg>
    </button>
  );
}

function ShopBtn() {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`font-[Cinzel] text-[10px] md:text-[11px] tracking-[0.2em]
        border border-[#c9973a] px-[18px] py-[10px] md:px-[22px] md:py-[11px]
        mt-[40px] md:mt-[60px] transition-all
        ${hov ? 'bg-[#c9973a] text-white' : 'text-[#c9973a]'}`}
    >
      SHOP COLLECTION +
    </button>
  );
}

export default function NewCollection() {
  const [startIndex, setStartIndex] = useState(0);
  const VISIBLE = 4;

  const canPrev = startIndex > 0;
  const canNext = startIndex + VISIBLE < PRODUCTS.length;
  const visible = PRODUCTS.slice(startIndex, startIndex + VISIBLE);

  return (
    <section className="bg-white pt-[40px] md:pt-[60px] pb-0">
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-9">
          <Flourish />
          <img
            src="/Group 7 (2).png"
            alt="New Collection"
            className="h-[30px] sm:h-[36px] md:h-[46px] mb-[16px] sm:mb-[20px] md:mb-[30px]"
          />
          <Flourish flip />
        </div>

        <div className="relative px-2 sm:px-3 md:px-0">
          <ArrowBtn
            direction="prev"
            onClick={() => setStartIndex(i => Math.max(0, i - 1))}
            disabled={!canPrev}
          />

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {visible.map((p) => (
              <div key={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          <ArrowBtn
            direction="next"
            onClick={() => setStartIndex(i => i + 1)}
            disabled={!canNext}
          />
        </div>

        <div className="text-center mt-6 md:mt-8 pb-1">
          <ShopBtn />
        </div>
      </div>

      <ElephantStrip />
    </section>
  );
}