import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Heart,
  SlidersHorizontal,
  Grid2X2,
  Grid3X3,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ─────────────────────────────────────────
   STATIC IMAGE PATHS  (public/images/)
───────────────────────────────────────── */
const IMGS = [
  "/images/s1.jpg",
  "/images/s2.jpg",
  "/images/s3.jpg",
  "/images/s4.jpg",
];

/* ─────────────────────────────────────────
   STATIC PRODUCTS
───────────────────────────────────────── */
const PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  _id:              `product-${i}`,
  name:             "Royal Kanjivaram Silk Saree",
  price:            18499,
  original_price:   22499,
  discounted_price: 18499,
  image:            IMGS[i % 4],
  createdAt:        new Date().toISOString(),
  rating:           4.5,
  category:         "Royal Silks",
}));

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
const getCurrentPrice  = (p) => Number(p.discounted_price ?? p.price ?? 0);
const getOriginalPrice = (p) => {
  const cur = p.discounted_price ?? p.price;
  if (p.original_price != null && p.original_price !== cur) return Number(p.original_price);
  return null;
};
const getDiscount = (p) => {
  const cur = getCurrentPrice(p);
  const ori = getOriginalPrice(p);
  if (!ori || ori <= cur) return null;
  return Math.round((1 - cur / ori) * 100);
};

/* ─────────────────────────────────────────
   FILTER CONFIG
───────────────────────────────────────── */
const SORT_OPTIONS = [
  { value: "default",    label: "Default"        },
  { value: "price_asc",  label: "Price: Low–High" },
  { value: "price_desc", label: "Price: High–Low" },
  { value: "newest",     label: "Newest First"    },
  { value: "rating",     label: "Top Rated"       },
];
const PRICE_RANGES = [
  { label: "Under ₹5,000",      min: 0,     max: 5000     },
  { label: "₹5,000 – ₹15,000",  min: 5000,  max: 15000    },
  { label: "₹15,000 – ₹30,000", min: 15000, max: 30000    },
  { label: "Above ₹30,000",     min: 30000, max: Infinity },
];
const CATEGORY_OPTIONS = ["Wedding", "Party Wear", "Bride", "Festive", "Casual", "Daily Wear"];
const COLOR_OPTIONS    = ["Red", "Pink", "Green", "Blue", "Yellow", "Purple", "Orange", "Gold"];
const FABRIC_OPTIONS   = ["Silk", "Cotton", "Chiffon", "Georgette", "Linen", "Banarasi"];

/* ─────────────────────────────────────────
   ACCORDION SECTION
───────────────────────────────────────── */
const AccordionSection = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left"
      >
        <span
          className="text-[12px] font-normal tracking-[0.14em] uppercase text-black"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {title}
        </span>
        {open
          ? <ChevronUp size={14} className="text-black" />
          : <ChevronDown size={14} className="text-black" />}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
};

/* ─────────────────────────────────────────
   FILTER SIDEBAR
   — on mobile: full-width drawer below top bar
   — on lg+: sticky left column
───────────────────────────────────────── */
const FilterSidebar = ({ filters, setFilters, onClose }) => {
  const toggle = (key, val) =>
    setFilters((f) => {
      const arr = f[key] || [];
      return { ...f, [key]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val] };
    });

  return (
    <aside className="w-full lg:w-[220px] lg:flex-shrink-0 bg-white rounded-xl px-5 py-4 self-start lg:sticky lg:top-[120px] border border-[#9383593B]">

      <AccordionSection title="Categories" defaultOpen={true}>
        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
          {CATEGORY_OPTIONS.map((c) => (
            <label key={c} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.categories || []).includes(c)}
                onChange={() => toggle("categories", c)}
                className="w-3.5 h-3.5 cursor-pointer accent-[#785822]"
              />
              <span
                className="text-[12px] font-normal leading-none text-[#785822]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {c}
              </span>
            </label>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Color" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {COLOR_OPTIONS.map((c) => {
            const checked = (filters.colors || []).includes(c);
            return (
              <button
                key={c}
                onClick={() => toggle("colors", c)}
                className="text-[11px] px-2.5 py-1 rounded-full border border-[#785822] transition-colors duration-150"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: checked ? "#fff" : "#785822",
                  backgroundColor: checked ? "#785822" : "transparent",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </AccordionSection>

      <AccordionSection title="Price" defaultOpen={false}>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((r) => {
            const active = filters.priceMin === r.min && filters.priceMax === r.max;
            return (
              <button
                key={r.label}
                onClick={() =>
                  setFilters((f) => ({
                    ...f,
                    priceMin: active ? null : r.min,
                    priceMax: active ? null : r.max,
                  }))
                }
                className="block w-full text-left text-[12px] py-1.5 px-2 rounded-sm transition-colors duration-150 text-[#785822]"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  backgroundColor: active ? "#f5ead4" : "transparent",
                }}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </AccordionSection>

      <AccordionSection title="Fabric" defaultOpen={false}>
        <div className="space-y-1.5">
          {FABRIC_OPTIONS.map((f) => (
            <label key={f} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.fabrics || []).includes(f)}
                onChange={() => toggle("fabrics", f)}
                className="w-3.5 h-3.5 cursor-pointer accent-[#785822]"
              />
              <span
                className="text-[12px] font-normal text-[#785822]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {f}
              </span>
            </label>
          ))}
        </div>
      </AccordionSection>

      <button
        onClick={() =>
          setFilters({ categories: [], colors: [], fabrics: [], priceMin: null, priceMax: null })
        }
        className="mt-4 w-full text-[11px] tracking-[0.16em] uppercase py-2 border border-[#1a1008] text-[#1a1008] transition-colors duration-200 hover:bg-[#1a1008] hover:text-white"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        Clear All
      </button>
    </aside>
  );
};

/* ─────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────── */
const ProductCard = ({ product, idx, wished, onWishlist, onNavigate }) => {
  const [imgErr, setImgErr] = useState(false);
  const imgSrc   = imgErr ? IMGS[idx % 4] : (product.image || IMGS[idx % 4]);
  const price    = getCurrentPrice(product);
  const original = getOriginalPrice(product);
  const discount = getDiscount(product);

  return (
    <div
      className="group relative cursor-pointer bg-white overflow-hidden shadow-sm hover:shadow-md select-none rounded-2xl border-2 border-transparent hover:border-sky-300 transition-all duration-300"
      onClick={() => onNavigate(product._id)}
    >
      <div
        className="relative w-full overflow-hidden bg-[#f0ebe2]"
        style={{ aspectRatio: "3/4", borderRadius: "14px 14px 0 0" }}
      >
        <img
          src={imgSrc}
          alt={product.name || "Saree"}
          onError={() => setImgErr(true)}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={(e) => { e.stopPropagation(); onWishlist(product._id); }}
          className="absolute top-2 right-2 transition-all duration-200"
        >
          <Heart
            size={16}
            fill={wished ? "#FB2E86" : "none"}
            stroke={wished ? "#FB2E86" : "#fff"}
            strokeWidth={1.8}
          />
        </button>
      </div>

      <div className="pt-2 pb-2.5 px-2.5">
        <p
          className="font-normal leading-snug line-clamp-1 mb-1 text-[#1E1E1E] text-[13px] sm:text-[14px]"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {product.name || "Saree"}
        </p>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span
            className="font-normal text-[#1E1E1E] text-[13px] sm:text-[15px]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            ₹{price.toLocaleString("en-IN")}
          </span>
          {original && (
            <span
              className="line-through text-[#aaa] text-[11px] sm:text-[12px]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              ₹{original.toLocaleString("en-IN")}
            </span>
          )}
          {discount && (
            <span
              className="ml-auto flex items-center justify-center rounded-full text-white text-[8px] sm:text-[9px] font-medium flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-[#785822]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {discount}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   YOU MAY LIKE  — always visible
───────────────────────────────────────── */
const YouMayLike = ({ wishlist, onWishlist, onNavigate }) => (
  <div className="mt-10 sm:mt-14 lg:mt-16 mb-8 sm:mb-12">
    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-10 flex-wrap">
      <img
        src="/images/h1.png"
        alt=""
        aria-hidden="true"
        className="h-5 sm:h-7 lg:h-8 w-auto object-contain opacity-60"
        style={{ transform: "scaleX(-1)" }}
      />
      <h2
        className="font-normal tracking-[0.18em] sm:tracking-[0.22em] uppercase text-[#1a1008] text-[18px] sm:text-[22px] lg:text-[26px]"
        style={{ fontFamily: "'Ibarra Real Nova', serif" }}
      >
        You May Like
      </h2>
      <img
        src="/images/h1.png"
        alt=""
        aria-hidden="true"
        className="h-5 sm:h-7 lg:h-8 w-auto object-contain opacity-60"
      />
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {PRODUCTS.slice(0, 5).map((product, idx) => (
        <ProductCard
          key={`yml-${product._id}`}
          product={product}
          idx={idx}
          wished={wishlist.has(product._id)}
          onWishlist={onWishlist}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  </div>
);

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
const ProductsPage = () => {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem("sheetalya_wishlist");
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch { return new Set(); }
  });

  const toggleWishlist = (pid) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(pid) ? next.delete(pid) : next.add(pid);
      try { localStorage.setItem("sheetalya_wishlist", JSON.stringify([...next])); } catch {}
      return next;
    });
  };

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy,     setSortBy]     = useState("default");
  const [sortOpen,   setSortOpen]   = useState(false);
  const [cols,       setCols]       = useState(4);
  const [filters, setFilters] = useState({
    categories: [], colors: [], fabrics: [],
    priceMin: null, priceMax: null,
  });

  const displayed = useMemo(() => {
    let list = [...PRODUCTS];
    if (filters.priceMin != null)
      list = list.filter((p) => getCurrentPrice(p) >= filters.priceMin);
    if (filters.priceMax != null && filters.priceMax !== Infinity)
      list = list.filter((p) => getCurrentPrice(p) <= filters.priceMax);
    switch (sortBy) {
      case "price_asc":  list.sort((a, b) => getCurrentPrice(a) - getCurrentPrice(b)); break;
      case "price_desc": list.sort((a, b) => getCurrentPrice(b) - getCurrentPrice(a)); break;
      case "newest":     list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
      case "rating":     list.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      default: break;
    }
    return list;
  }, [filters, sortBy]);

  /* grid cols — on mobile filter is stacked above so always use full width cols */
  const gridColClass = filterOpen
    ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
    : (cols === 3
        ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4");

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:wght@400;500&family=Outfit:wght@300;400;500&display=swap"
      />

      <Navbar />

      <div className="min-h-screen bg-white pt-[72px]" style={{ fontFamily: "'Outfit', sans-serif" }}>

        {/* ── STICKY TOP BAR ── */}
        <div className="sticky top-[72px] z-20 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 gap-2">

            {/* Show/Hide Filter */}
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className="flex items-center gap-1.5 sm:gap-2.5 text-[11px] sm:text-[13px] font-normal tracking-[0.14em] sm:tracking-[0.16em] uppercase px-2 sm:px-3 py-1.5 rounded border border-[#9383593B] text-black transition-colors duration-150 flex-shrink-0"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <SlidersHorizontal size={13} />
              <span className="hidden xs:inline">{filterOpen ? "Hide Filter" : "Show Filter"}</span>
              <span className="xs:hidden">Filter</span>
            </button>

            {/* Looks count */}
            <span
              className="text-[10px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.18em] uppercase text-gray-400 flex-shrink-0"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {displayed.length} Looks
            </span>

            <div className="flex items-center gap-3 sm:gap-5">
              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-[13px] font-normal tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#1a1008] hover:text-[#938359] transition-colors duration-150"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Sort
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {sortOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 z-20 bg-white border border-gray-100 shadow-lg w-[160px] sm:w-[180px] py-1">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                          className="block w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-[12px] tracking-wide transition-colors duration-100"
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            backgroundColor: sortBy === opt.value ? "#f5ead4" : "transparent",
                            color: sortBy === opt.value ? "#938359" : "#666",
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Grid toggle — hidden on mobile (always 2-col) */}
              <div className="hidden sm:flex items-center border border-gray-200 rounded-sm overflow-hidden">
                <button
                  onClick={() => setCols(4)}
                  className="p-1.5 transition-colors duration-150"
                  style={{ backgroundColor: cols === 4 ? "#1a1008" : "transparent", color: cols === 4 ? "#fff" : "#aaa" }}
                >
                  <Grid2X2 size={13} />
                </button>
                <button
                  onClick={() => setCols(3)}
                  className="p-1.5 transition-colors duration-150"
                  style={{ backgroundColor: cols === 3 ? "#1a1008" : "transparent", color: cols === 3 ? "#fff" : "#aaa" }}
                >
                  <Grid3X3 size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="px-3 sm:px-5 sm:px-7 lg:px-10 py-4 sm:py-6">

          {/* Filter — on mobile stacks above grid; on lg+ sits beside grid */}
          {filterOpen && (
            <div className="block lg:hidden mb-4">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          )}

          <div className="flex gap-6 items-start">
            {filterOpen && (
              <div className="hidden lg:block">
                <FilterSidebar filters={filters} setFilters={setFilters} />
              </div>
            )}

            <div className="flex-1 min-w-0">
              {displayed.length === 0 ? (
                <div className="text-center py-20 sm:py-28 text-gray-400 text-sm tracking-wide">
                  No products found.
                </div>
              ) : (
                <div className={`grid ${gridColClass} gap-3 sm:gap-4`}>
                  {displayed.map((product, idx) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      idx={idx}
                      wished={wishlist.has(product._id)}
                      onWishlist={toggleWishlist}
                      onNavigate={(id) => navigate(`/products/${id}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── YOU MAY LIKE — always visible ── */}
          <YouMayLike
            wishlist={wishlist}
            onWishlist={toggleWishlist}
            onNavigate={(id) => navigate(`/products/${id}`)}
          />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
