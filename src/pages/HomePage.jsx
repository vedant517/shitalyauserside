import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar              from "../components/Navbar";
import ExploreCategorySection from "../components/ExploreCategorySection";
import AboutSection        from "../components/AboutSection";
import NewCollection       from "../components/NewCollection";
import TrendingCategory    from "../components/TrendingCategory";
import SaleBanner          from "../components/SaleBanner";
import PerfectSaree        from "../components/PerfectSaree";
import FullBannerSection   from "../components/FullBanner";
import NewwCollection      from "../components/Morenewcollection";
import WhyChooseUs         from "../components/WhyChooseUs";
import NewsletterFooter    from "../components/NewsLetterFooter";

const HomePage1 = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:wght@400;500&family=Outfit:wght@300;400;500&display=swap');
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.08);
          opacity: 0;
          transition: opacity 0.28s ease;
        }
        .hero-btn:hover::before { opacity: 1; }
      `}</style>

      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative w-full h-svh min-h-[480px] sm:min-h-[560px] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover object-top z-0"
          src="/videos/saree.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgba(6,4,2,0.25)] via-[rgba(6,4,2,0.15)] to-[rgba(6,4,2,0.72)]" />

        <div className="absolute inset-x-0 bottom-0 z-10 h-[38%] bg-gradient-to-t from-yellow-400/45 via-yellow-400/20 to-transparent" />

        <div className="absolute inset-0 z-20 flex items-end justify-center pb-10 sm:pb-16 md:pb-20 lg:pb-24">
          <div className="w-full max-w-[720px] px-4 sm:px-6 text-center animate-[heroFadeUp_1.1s_ease_both]">
            <h1
              className="font-normal text-white leading-[1.15] mb-3 sm:mb-4 text-[clamp(1.4rem,5vw,3.6rem)] sm:whitespace-nowrap"
              style={{ fontFamily: "'Ibarra Real Nova', serif" }}
            >
              Draped in Timeless Elegance
            </h1>

            <p className="text-white/90 leading-[1.75] mb-5 sm:mb-6 text-[clamp(0.78rem,2vw,1.05rem)] px-2 sm:px-0">
              Experience the art of fine sarees where tradition meets modern luxury.
              <br className="hidden sm:block" />
              Every weave tells a story of grace, heritage, and sophistication.
            </p>

            <button
              className="hero-btn relative border border-white px-5 sm:px-6 py-2.5 sm:py-3 text-white uppercase tracking-widest hover:bg-white/10 text-[11px] sm:text-[13px]"
              onClick={() => navigate("/products")}
            >
              Explore Collection
            </button>
          </div>
        </div>
      </section>

      {/* ── EXPLORE CATEGORY (other dev) ── */}
      <ExploreCategorySection />

      {/* ── IMAGE WITH LOGO OVERLAY (other dev) ── */}
      <div className="relative w-full">
        <img
          src="/images/p3.jpg"
          alt="saree"
          className="w-full h-auto object-cover"
        />
        <img
          src="/images/logo.png"
          alt="logo"
          className="absolute top-3 sm:top-4 md:top-6 left-1/2 -translate-x-1/2 h-6 sm:h-8 md:h-10 object-contain"
        />
      </div>

      {/* ── ABOUT SECTION (other dev) ── */}
      <AboutSection />


      {/* ── NEW COLLECTION grid + elephant strip (your dev) ── */}
      <NewCollection />

      {/* ── TRENDING CATEGORY with tabs (your dev) ── */}
      <TrendingCategory />

      {/* ── SALE BANNER (your dev) ── */}
      <SaleBanner />

      {/* ── YOUR PERFECT SAREE AWAITS (your dev) ── */}
      <PerfectSaree />

      {/* ── FULL BANNER (your dev) ── */}
      <FullBannerSection />

      {/* ── MORE NEW COLLECTION (your dev) ── */}
      <NewwCollection />

      {/* ── WHY CHOOSE US (your dev) ── */}
      <WhyChooseUs />

      
      {/* ── NEWSLETTER + FOOTER (your dev) ── */}
      <NewsletterFooter />
    </>
  );
};

export default HomePage1;