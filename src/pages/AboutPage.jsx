import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import OurStorySection from "../components/OurStorySection";
import CommitmentSection from "../components/CommitmentSection";
import Endabout from "../components/Endabout";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Ibarra+Real_Nova:ital,wght@0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500&display=swap"
      />

      <Navbar />

      {/* ── HERO SECTION ── */}
      <section
        className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: `url(images/bg2.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Very light overlay */}
        <div className="absolute inset-0 bg-black/5" />

        {/* ── CENTER CONTENT ── */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-16 sm:py-0">

          {/* ── Text Image ── */}
          <div className="relative w-[85vw] xs:w-[75vw] sm:w-[420px] md:w-[500px] lg:w-[550px] aspect-square mb-2">
            <img
              src="images/text.jpg"
              alt="About Us"
              className="w-full h-full object-contain"
            />

            {/* Overlay text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

              {/* About Us + underline */}
              <div className="mt-6 sm:mt-10 md:mt-14 lg:mt-16 flex flex-col items-center">
                <h1
                  className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] tracking-[0.2em] uppercase text-[#938359]"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  About Us
                </h1>

                {/* Black line */}
                <div className="mt-1.5 sm:mt-2 w-8 sm:w-10 md:w-12 h-[1px] bg-black" />
              </div>

              <h1
                className="mt-2 sm:mt-3 md:mt-4 text-[22px] sm:text-[30px] md:text-[38px] lg:text-[48px] font-normal text-[#1a1008] leading-[1.12] tracking-[0.06em] uppercase"
                style={{ fontFamily: "'Ibarra Real Nova', serif" }}
              >
                A Legacy Of<br />Elegance
              </h1>

              <button
                onClick={() => navigate("/products")}
                className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 px-6 sm:px-7 md:px-8 lg:px-9 py-2 sm:py-2.5 md:py-3 text-[9px] sm:text-[10px] md:text-[10.5px] tracking-[0.24em] uppercase text-white hover:opacity-85 transition-opacity duration-200"
                style={{
                  backgroundColor: "#938359",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Read More →
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* ── OUR STORY SECTION ── */}
      <OurStorySection />
      <CommitmentSection />
      <Endabout/>
    </>
  );
};

export default AboutPage;
