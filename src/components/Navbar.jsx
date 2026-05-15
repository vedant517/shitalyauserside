import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu, X, Home, ClipboardList, LogOut } from "lucide-react";
import { useGetProductsQuery } from "../Redux/api/productsApi";

/* ── SearchDropdown ── */
const SearchDropdown = ({ query, products, onSelect }) => {
  const results = useMemo(() => {
    if (!query.trim() || !products.length) return [];
    const q = query.toLowerCase();
    return products
      .filter((p) => (p.name || "").toLowerCase().includes(q))
      .slice(0, 6);
  }, [query, products]);

  if (!query.trim()) return null;

  return (
    <div
      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden z-50"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {results.length === 0 ? (
        <div className="px-4 py-5 text-center text-[12px] tracking-wide text-gray-400 uppercase">
          No products found
        </div>
      ) : (
        results.map((p, idx) => {
          const img = (Array.isArray(p.images) && p.images.length) ? p.images[0]?.url : (p.image ?? "/images/s1.jpg");
          return (
            <button
              key={p._id}
              onMouseDown={() => onSelect(p._id)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FFF5E2] transition-colors duration-150 border-b border-gray-50 last:border-0 text-left"
            >
              <img
                src={img}
                alt={p.name}
                className="w-10 h-12 object-cover object-top rounded-lg flex-shrink-0 bg-[#f0ebe2]"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-[#1a1008] truncate leading-snug">
                  {p.name}
                </p>
                <p className="text-[12px] text-[#785822] mt-0.5">
                  ₹{Number(p.discountPrice || p.discounted_price || p.price || 0).toLocaleString("en-IN")}
                </p>
              </div>
            </button>
          );
        })
      )}
    </div>
  );
};

const Navbar = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [isLoggedIn,  setIsLoggedIn]  = useState(() => !!localStorage.getItem("isLoggedIn"));
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchRef = useRef(null);
  const inputRef  = useRef(null);
  const navigate  = useNavigate();
  const location  = useLocation();
  const isHome    = location.pathname === "/";

  /* fetch all products for search */
  const { data: rawData } = useGetProductsQuery({});
  const allProducts = useMemo(() => {
    if (!rawData) return [];
    if (Array.isArray(rawData)) return rawData;
    if (Array.isArray(rawData.data)) return rawData.data;
    if (Array.isArray(rawData.products)) return rawData.products;
    return [];
  }, [rawData]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleAuthChange = () => setIsLoggedIn(!!localStorage.getItem("isLoggedIn"));
    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  /* Close search on outside click */
  useEffect(() => {
    const handle = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  /* Auto-focus desktop input when search opens */
  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    setMenuOpen(false);
    navigate("/login");
  };

  const handleSearchSelect = (productId) => {
    setSearchOpen(false);
    setSearchQuery("");
    navigate(`/products/${productId}`);
  };

  const handleSearchIconClick = () => {
    setSearchOpen((prev) => !prev);
    setSearchQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); }
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navBg = isHome
    ? scrolled
      ? "bg-[#FFF5E2] backdrop-blur-md border-b border-black/10"
      : "bg-transparent"
    : "bg-[#FFF5E2] border-b border-black/10";

  const textColor = isHome && !scrolled ? "text-white" : "text-[#1a1008]";

  const navLinks = [
    { label: "Home",     path: "/"         },
    { label: "Products", path: "/products" },
    { label: "About",    path: "/about"    },
    { label: "Contact",  path: "/contact"  },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${navBg}`}
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="max-w-[1280px] mx-auto h-[72px] flex items-center justify-between px-4 md:px-6 relative">

        {/* ── LEFT LINKS ── */}
        <div className="flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden ${textColor} p-1 mr-2`}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          
          <div className="hidden md:flex items-center gap-5">
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
            {isLoggedIn && (
              <Link
                to="/order-history"
                className={`relative flex items-center gap-1 text-[12.5px] tracking-[0.12em] uppercase transition-colors duration-200 hover:text-[#c8a05a] ${textColor}
                  after:content-[''] after:absolute after:left-0 after:-bottom-[3px] after:w-0 after:h-[1px] after:bg-[#c8a05a] after:transition-all after:duration-300 hover:after:w-full`}
              >
                Orders
              </Link>
            )}
          </div>
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
        <div className="flex items-center gap-3 md:gap-5">
          
          {/* Search Box */}
          <div ref={searchRef} className="relative flex items-center">
            <div
              className={`hidden md:flex items-center overflow-hidden transition-all duration-300 ${
                searchOpen ? "w-[180px] border-b border-[#c8a05a]" : "w-0 border-b border-transparent"
              }`}
            >
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search sarees..."
                className="w-full bg-transparent text-[13px] text-[#1a1008] placeholder-gray-400 outline-none px-1 py-0.5"
              />
            </div>
            <button
              onClick={handleSearchIconClick}
              className={`${textColor} hover:text-[#c8a05a] transition-colors`}
            >
              <Search size={18} />
            </button>
            {searchOpen && searchQuery && (
              <div className="hidden md:block absolute top-full right-0 w-[300px]">
                <SearchDropdown query={searchQuery} products={allProducts} onSelect={handleSearchSelect} />
              </div>
            )}
          </div>

          <button onClick={() => navigate("/wishlist")} className={`${textColor} hover:text-[#c8a05a]`}>
            <Heart size={18} />
          </button>

          <button onClick={() => navigate("/cart")} className={`${textColor} hover:text-[#c8a05a]`}>
            <ShoppingBag size={18} />
          </button>

          {isLoggedIn ? (
            <button onClick={handleLogout} className={`${textColor} hover:text-[#c8a05a]`} title="Logout">
              <LogOut size={18} />
            </button>
          ) : (
            <button onClick={() => navigate("/login")} className={`${textColor} hover:text-[#c8a05a]`}>
              <User size={18} />
            </button>
          )}
        </div>
      </div>

      {/* MOBILE SEARCH & MENU */}
      {searchOpen && (
        <div className={`md:hidden w-full px-4 py-2 border-t border-black/10 ${isHome && !scrolled ? "bg-black/80" : "bg-[#FFF5E2]"}`}>
          <div className="flex items-center gap-2 border-b border-[#c8a05a] pb-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              autoFocus
              className={`flex-1 bg-transparent text-sm outline-none ${isHome && !scrolled ? "text-white" : "text-[#1a1008]"}`}
            />
          </div>
          {searchQuery && (
            <div className="relative mt-1">
              <SearchDropdown query={searchQuery} products={allProducts} onSelect={handleSearchSelect} />
            </div>
          )}
        </div>
      )}

      {menuOpen && (
        <div className={`md:hidden px-6 py-6 flex flex-col gap-5 text-center border-t border-black/10 ${isHome && !scrolled ? "bg-black/70 text-white" : "bg-[#FFF5E2]"}`}>
          {navLinks.map(({ label, path }) => (
            <Link key={label} to={path} onClick={() => setMenuOpen(false)} className="uppercase tracking-[0.14em] text-sm hover:text-[#c8a05a]">
              {label}
            </Link>
          ))}
          {isLoggedIn && (
            <Link to="/order-history" onClick={() => setMenuOpen(false)} className="uppercase tracking-[0.14em] text-sm hover:text-[#c8a05a]">
              Orders
            </Link>
          )}
          <Link to="/login" onClick={() => setMenuOpen(false)} className="uppercase tracking-[0.14em] text-sm hover:text-[#c8a05a]">
            {isLoggedIn ? "Logout" : "Login"}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;