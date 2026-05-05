import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu, X, Home } from "lucide-react";

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = isHome
    ? scrolled
      ? "bg-[#FFF5E2] backdrop-blur-md border-b border-black/10"
      : "bg-transparent"
    : "bg-[#FFF5E2] border-b border-black/10";

  const textColor = isHome && !scrolled ? "text-white" : "text-[#1a1008]";

  // All nav links — matched to your merged App.jsx routes
  const navLinks = [
    { label: "Home",        path: "/"            },
    { label: "Products",    path: "/products"    },
    { label: "About",       path: "/about"       },
    { label: "Contact",     path: "/contact"     },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${navBg}`}
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="max-w-[1280px] mx-auto h-[72px] flex items-center justify-between px-1 md:px-3">

        {/* ── LEFT LINKS ── */}
        <div className="hidden md:flex items-center gap-5 ml-1">
          {navLinks.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className={`relative flex items-center gap-1 text-[12.5px] tracking-[0.12em] uppercase transition-colors duration-200 hover:text-[#c8a05a] ${textColor}
                after:content-[''] after:absolute after:left-0 after:-bottom-[3px] after:w-0 after:h-[1px] after:bg-[#c8a05a] after:transition-all after:duration-300 hover:after:w-full`}
            >
              {label === "Home" && <Home size={14} />}
              {label}
            </Link>
          ))}
        </div>

        {/* ── MOBILE HAMBURGER ── */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className={textColor}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── CENTER LOGO ── */}
        <div
          onClick={() => navigate("/")}
          className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
        >
          <img
            src="/images/logo.png"
            alt="logo"
            className="h-[50px] md:h-[60px] object-contain"
          />
        </div>

        {/* ── RIGHT ICONS ── */}
        <div className="flex items-center gap-3 md:gap-5 mr-1">
          <button
            onClick={() => navigate("/products")}
            className={`${textColor} hover:text-[#c8a05a]`}
            title="Search"
          >
            <Search size={18} />
          </button>

          <button
            onClick={() => navigate("/wishlist")}
            className={`${textColor} hover:text-[#c8a05a]`}
            title="Wishlist"
          >
            <Heart size={18} />
          </button>

          <button
            onClick={() => navigate("/cart")}
            className={`${textColor} hover:text-[#c8a05a]`}
            title="Cart"
          >
            <ShoppingBag size={18} />
          </button>

          <button
            onClick={() => navigate("/login")}
            className={`${textColor} hover:text-[#c8a05a]`}
            title="Login / Account"
          >
            <User size={18} />
          </button>
        </div>
      </div>

      {/* ── MOBILE DROPDOWN MENU ── */}
      {menuOpen && (
        <div
          className={`md:hidden px-6 py-6 flex flex-col gap-6 text-center border-t border-black/10
            ${isHome && !scrolled ? "bg-black/70 text-white" : "bg-[#FFF5E2]"}`}
        >
          {navLinks.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              onClick={() => setMenuOpen(false)}
              className="uppercase tracking-[0.14em] hover:text-[#c8a05a] transition-colors"
            >
              {label}
            </Link>
          ))}

          {/* Extra mobile-only links */}
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="uppercase tracking-[0.14em] hover:text-[#c8a05a] transition-colors"
          >
            Login
          </Link>
          <Link
            to="/wishlist"
            onClick={() => setMenuOpen(false)}
            className="uppercase tracking-[0.14em] hover:text-[#c8a05a] transition-colors"
          >
            Wishlist
          </Link>
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="uppercase tracking-[0.14em] hover:text-[#c8a05a] transition-colors"
          >
            Cart
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;