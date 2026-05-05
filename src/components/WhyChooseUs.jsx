import { useState } from 'react';

export default function WhyChooseUsSection() {
  const [hovered, setHovered] = useState(false);

  const handleShopNow = () => {
    window.location.href = '/products';
  };

  return (
    <section className="w-full bg-white py-6 sm:py-10 lg:py-16 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative">

        {/* Main Image */}
        <img
          src="/whytochoose.png"
          alt="Why Choose Us"
          className="w-full h-auto block"
        />

        {/* Shop Now Button Overlay */}
        <div className="absolute bottom-[4%] sm:bottom-[6%] md:bottom-[8%] lg:bottom-[10%] left-1/2 -translate-x-1/2">
          <button
            onClick={handleShopNow}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="
              whitespace-nowrap border-none cursor-pointer
              font-[Cinzel,serif]
              text-[8px] xs:text-[9px] sm:text-[10px] md:text-[11px] lg:text-[13px]
              tracking-[0.14em] sm:tracking-[0.18em]
              font-semibold
              px-4 xs:px-5 sm:px-7 md:px-9
              py-2 xs:py-2.5 sm:py-3 md:py-[14px]
              transition-all duration-300
            "
            style={{
              background: 'linear-gradient(135deg, #c9973a 0%, #f0d080 50%, #c9973a 100%)',
              backgroundSize: '200% auto',
              backgroundPosition: hovered ? 'right center' : 'left center',
              color: '#1a0800',
              boxShadow: hovered
                ? '0 6px 24px rgba(201,151,58,0.55)'
                : '0 4px 16px rgba(201,151,58,0.35)',
            }}
          >
            SHOP NOW →
          </button>
        </div>
      </div>
    </section>
  );
}