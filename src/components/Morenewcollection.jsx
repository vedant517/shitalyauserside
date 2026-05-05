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

export function SectionTitle({ children }) {
  return (
    <div className="text-center mb-6 sm:mb-8 md:mb-10">
      <div className="flex items-center justify-center gap-4">
        <img
          src="/Group 7 (2).png"
          alt="New Collection"
          className="h-[36px] sm:h-[42px] md:h-[50px] w-auto object-contain"
        />
      </div>
    </div>
  );
}

function ElephantStrip() {
  return (
    <div className="bg-[#faf0dc] overflow-hidden py-[10px] mt-[40px]">
      <div
        className="flex items-center w-max"
        style={{ animation: 'marquee 20s linear infinite' }}
      >
        {Array(16).fill(0).map((_, i) => (
          <img
            key={i}
            src="/elephantt.png"
            alt=""
            className="h-[56px] sm:h-[68px] md:h-[80px] w-auto mx-[10px] sm:mx-[14px] md:mx-[16px] inline-block object-contain"
            style={{ transform: i % 2 === 1 ? 'scaleX(-1)' : 'none' }}
          />
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default function NewwCollection() {
  return (
    <section className="pt-[40px] sm:pt-[50px] md:pt-[60px] pb-0 bg-[#fdf8f0]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
        <SectionTitle>New Collection</SectionTitle>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="text-center mt-[28px] sm:mt-[32px] md:mt-[36px] pb-2">
          <button
            className="bg-transparent text-[#c9973a] font-[Cinzel] text-[10px] sm:text-[11px] tracking-[0.22em] font-semibold px-[24px] sm:px-[28px] md:px-[32px] py-[10px] sm:py-[11px] border border-[#c9973a] cursor-pointer transition-all hover:bg-[#c9973a] hover:text-white"
          >
            SHOP COLLECTION →
          </button>
        </div>
      </div>

      <ElephantStrip />
    </section>
  );
}