import { useState } from 'react';
import ProductCard from './ProductCard';

const CATEGORIES = [
  { id: 1, name: 'Silk Sarees' },
  { id: 2, name: 'Cotton Sarees' },
  { id: 3, name: 'Lehengas' },
  { id: 4, name: 'Kurtis' },
  { id: 5, name: 'Dupattas' },
];

const ALL_PRODUCTS = {
  'Silk Sarees': [
    { id: 1, name: 'Royal Kanjivaram Silk',  price: 18499, mrp: 19499, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80' },
    { id: 2, name: 'Pure Banarasi Silk',     price: 22999, mrp: 24999, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=80' },
    { id: 3, name: 'Kanjivaram Wedding',     price: 15999, mrp: 17999, image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80' },
    { id: 4, name: 'Handloom Silk Saree',    price: 18499, mrp: 20499, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e8e?w=400&q=80' },
    { id: 5, name: 'Bridal Kanjivaram',      price: 24999, mrp: 27999, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80' },
  ],
  'Cotton Sarees': [
    { id: 6,  name: 'Bengal Tant Cotton',    price: 4999,  mrp: 5999,  image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=80' },
    { id: 7,  name: 'Khadi Cotton Saree',    price: 3999,  mrp: 4999,  image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80' },
    { id: 8,  name: 'Handloom Cotton',       price: 5499,  mrp: 6499,  image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80' },
    { id: 9,  name: 'Jamdani Cotton',        price: 6999,  mrp: 7999,  image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e8e?w=400&q=80' },
    { id: 10, name: 'Sambalpuri Cotton',     price: 4499,  mrp: 5499,  image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80' },
  ],
  'Lehengas': [
    { id: 11, name: 'Bridal Lehenga',        price: 34999, mrp: 39999, image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80' },
    { id: 12, name: 'Designer Lehenga',      price: 24999, mrp: 28999, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=80' },
    { id: 13, name: 'Silk Lehenga Choli',    price: 18999, mrp: 21999, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e8e?w=400&q=80' },
    { id: 14, name: 'Zardosi Lehenga',       price: 29999, mrp: 34999, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80' },
    { id: 15, name: 'Anarkali Lehenga',      price: 15999, mrp: 18999, image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80' },
  ],
  'Kurtis': [
    { id: 16, name: 'Lucknowi Chikankari',   price: 2499,  mrp: 2999,  image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=80' },
    { id: 17, name: 'Anarkali Kurti',        price: 1999,  mrp: 2499,  image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80' },
    { id: 18, name: 'Silk Printed Kurti',    price: 3499,  mrp: 3999,  image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80' },
    { id: 19, name: 'Embroidered Kurti',     price: 2999,  mrp: 3499,  image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e8e?w=400&q=80' },
    { id: 20, name: 'Straight Cut Kurti',    price: 1499,  mrp: 1999,  image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80' },
  ],
  'Dupattas': [
    { id: 21, name: 'Banarasi Dupatta',      price: 1999,  mrp: 2499,  image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=80' },
    { id: 22, name: 'Chiffon Dupatta',       price: 999,   mrp: 1499,  image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80' },
    { id: 23, name: 'Embroidered Dupatta',   price: 1499,  mrp: 1999,  image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e8e?w=400&q=80' },
    { id: 24, name: 'Silk Dupatta',          price: 2499,  mrp: 2999,  image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80' },
    { id: 25, name: 'Phulkari Dupatta',      price: 1299,  mrp: 1699,  image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=80' },
  ],
};

export default function TrendingCategory() {
  const [activeCategory, setActiveCategory] = useState('Silk Sarees');

  const trending = ALL_PRODUCTS[activeCategory] || [];

  return (
    <section className="py-8 sm:py-10 md:py-[60px] bg-white">
      <div className="max-w-[1280px] mx-auto px-3 sm:px-6 md:px-10">

        {/* TITLE */}
        <div className="flex justify-center mb-6 sm:mb-9">
          <img
            src="/Group 11.png"
            alt="Trending Category"
            className="w-[200px] sm:w-[340px] md:w-[500px] h-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
          />
        </div>

        {/* TABS — scrollable on mobile */}
        <div className="flex overflow-x-auto no-scrollbar justify-start sm:justify-center mt-3 sm:mt-5 mb-5 sm:mb-[30px] border-b border-[#e8d5b5]">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`
                  font-['Cinzel'] whitespace-nowrap flex-shrink-0
                  text-[10px] sm:text-[11px]
                  px-3 sm:px-5 md:px-[28px]
                  py-[8px] sm:py-[10px]
                  border-b-[2.5px] -mb-px
                  tracking-[0.08em] sm:tracking-[0.14em]
                  transition-all duration-200
                  outline-none bg-transparent
                  ${active
                    ? 'text-[#c9973a] font-bold border-[#c9973a]'
                    : 'text-[#6b4c1a] border-transparent hover:text-[#c9973a]'}
                `}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* GRID */}
        <div className="w-full">
          {/* Mobile: 2 cols, Tablet: 3 cols, Desktop: 5 cols */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 md:gap-7 lg:gap-10">
            {trending.slice(0, 5).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* BUTTON */}
        <div className="text-center mt-8 sm:mt-10 md:mt-[60px]">
          <button
            className="
              font-['Cinzel'] text-[10px] sm:text-[11px] tracking-[0.18em] font-semibold
              px-8 sm:px-[36px] py-[11px] sm:py-[13px]
              bg-white text-[#1a0800]
              transition-all duration-300
            "
          >
          </button>
        </div>

      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}