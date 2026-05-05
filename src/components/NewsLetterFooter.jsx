import { FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function NewsletterFooter() {
  return (
    <section className="w-full font-sans">
      {/* ── Main CTA Banner ── */}
      <div
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/f_bg.jpg')" }}
      >
        {/* Subtle warm overlay to blend with parchment bg */}
        <div className="absolute inset-0 bg-[#f5e9d0]/10 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 sm:py-16 md:py-20 text-center">

          {/* Logo */}
          <div className="mb-5 sm:mb-6">
            <img
              src="/images/logo.png"
              alt="Sheetalya Logo"
              className="h-16 sm:h-20 md:h-24 w-auto mx-auto drop-shadow-md"
            />
          </div>

          {/* Tagline */}
          <p
            className="tracking-[0.3em] text-xs sm:text-sm font-medium mb-3 sm:mb-4"
            style={{ color: "#785822", fontFamily: "'Outfit', sans-serif" }}
          >
            TIMELESS ELEGANCE, REDEFINED
          </p>

          {/* Heading row with decorative scrolls */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-8 w-full max-w-5xl mx-auto mb-3 sm:mb-4">
            {/* Left scroll */}
            <img
              src="/images/h1.png"
              alt=""
              aria-hidden="true"
              className="h-10 sm:h-14 md:h-16 w-auto flex-shrink-0 scale-x-[-1]"
            />

            {/* Main heading */}
            <h1
              className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-bold leading-tight"
              style={{
                color: "#785822",
                fontFamily: "'Abhaya Libre', serif",
              }}
            >
              Request More Information
            </h1>

            {/* Right scroll */}
            <img
              src="/images/h1.png"
              alt=""
              aria-hidden="true"
              className="h-10 sm:h-14 md:h-16 w-auto flex-shrink-0"
            />
          </div>

          {/* Sub-heading */}
          <p
            className="text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md md:max-w-lg mb-7 sm:mb-9"
            style={{ color: "#1E1E1E", fontFamily: "'Outfit', sans-serif" }}
          >
            Celebrating the beauty of tradition with a touch of modern luxury.
          </p>

          {/* Contact Us Button */}
          <a
            href="#contact"
            className="inline-block px-10 sm:px-14 py-2.5 sm:py-3 text-sm sm:text-base font-medium border transition-all duration-300 hover:bg-[#785822] hover:text-white"
            style={{
              color: "#785822",
              borderColor: "#785822",
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            Contact Us
          </a>

          {/* Copyright */}
          <p
            className="mt-8 sm:mt-10 text-xs sm:text-sm text-white"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            © 2026 Sheetalya. All copyerights reserved.
          </p>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="w-full h-px bg-black" />

      {/* ── Bottom Bar ── */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/f_bg.jpg')" }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-8 md:px-12 py-4 sm:py-5 max-w-screen-xl mx-auto">

          {/* Left: Dev credit */}
          <div
            className="flex items-center gap-2 text-xs sm:text-sm text-[#1E1E1E] flex-shrink-0"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <span className="whitespace-nowrap">Developed &amp; Designed By</span>
            <img
              src="/images/tech.png"
              alt="Tech Surya IT Solution"
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </div>

          {/* Center: Nav links */}
          <nav
            className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium tracking-wider"
            style={{ color: "#1E1E1E", fontFamily: "'Outfit', sans-serif" }}
          >
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

          {/* Right: Social icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {[
              { icon: <FaLinkedinIn size={13} />, href: "#", label: "LinkedIn" },
              { icon: <FaFacebookF size={13} />, href: "#", label: "Facebook" },
              { icon: <FaInstagram size={13} />, href: "#", label: "Instagram" },
              { icon: <FaYoutube size={14} />, href: "#", label: "YouTube" },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#785822] flex items-center justify-center text-[#785822] hover:bg-[#785822] hover:text-white transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
