import { FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function NewsletterFooter() {
  return (
    <section className="w-full font-sans">
      
      <div
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/f_bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#f5e9d0]/10 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-start px-4 pt-12 sm:pt-14 md:pt-16 pb-6 text-center">

          <div className="mb-3 sm:mb-4">
            <img
              src="/images/logo.png"
              alt="Sheetalya Logo"
              className="h-12 sm:h-14 md:h-16 w-auto mx-auto drop-shadow-md"
            />
          </div>

          <p className="tracking-[0.3em] text-xs sm:text-sm font-medium mb-2 text-[#785822] font-[Outfit]">
            TIMELESS ELEGANCE, REDEFINED
          </p>

          <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-6 w-full max-w-5xl mx-auto mb-2">

            <img
              src="/images/h1.png"
              alt=""
              className="h-9 sm:h-12 md:h-14 scale-x-[-1]"
            />

            <h1 className="whitespace-nowrap text-lg sm:text-3xl md:text-4xl lg:text-[2.6rem] text-[#785822] font-[Abhaya_Libre]">
              Request More Information
            </h1>

            <img
              src="/images/h1.png"
              alt=""
              className="h-9 sm:h-12 md:h-14"
            />
          </div>

          <p className="text-sm sm:text-base md:text-lg mb-4 text-[#1E1E1E] font-[Outfit] whitespace-nowrap">
            Celebrating the beauty of tradition with a touch of modern luxury.
          </p>

          <a
            href="#contact"
            className="inline-block px-8 sm:px-12 py-2 sm:py-2.5 text-sm sm:text-base font-medium border border-[#785822] text-[#785822] transition-all duration-300 hover:bg-[#785822] hover:text-white"
          >
            Contact Us
          </a>

          <p className="mt-5 text-xs sm:text-sm text-white font-[Outfit]">
            © 2026 Sheetalya. All copyerights reserved.
          </p>

          {/* ✅ Bottom Section */}
          <div className="mt-4 w-full max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 md:px-10">

            {/* LEFT (white text + bigger logo) */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs md:text-sm text-white">
              <span className="whitespace-nowrap">Developed & Designed By</span>
              <img
  src="/images/tech.png"
  alt="Tech Surya IT Solution"
  className="h-14 sm:h-16 md:h-20 w-auto object-contain"
/>
            </div>

            {/* CENTER (shifted slightly left + white) */}
            <nav className="flex items-center gap-5 sm:gap-6 text-[11px] sm:text-xs md:text-sm font-medium tracking-wider text-white sm:-ml-6 md:-ml-10">
              {["HOME", "ABOUT", "PRODUCTS"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="hover:text-[#785822] transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* RIGHT (unchanged icons) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {[
                { icon: <FaLinkedinIn size={12} />, label: "LinkedIn" },
                { icon: <FaFacebookF size={12} />, label: "Facebook" },
                { icon: <FaInstagram size={12} />, label: "Instagram" },
                { icon: <FaYoutube size={13} />, label: "YouTube" },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#785822] flex items-center justify-center text-[#785822] hover:bg-[#785822] hover:text-white transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}