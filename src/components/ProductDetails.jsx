import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useGetProductByIdQuery, useGetProductsQuery } from "../Redux/api/productsApi";
import { useAddToCartMutation } from "../Redux/api/cartApi";
import { useAddToWishlistMutation } from "../Redux/api/wishlistApi";
import { Loader2, AlertCircle, Heart } from "lucide-react";

/* ─────────────────────────────────────────
   FALLBACK IMAGES
───────────────────────────────────────── */
const FALLBACK_IMGS = [
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
  "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80",
  "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80",
  "https://images.unsplash.com/photo-1594938298603-c8148c4b4e8e?w=600&q=80",
];

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
const resolveImg = (img) => {
  if (!img) return null;
  if (typeof img === "string") return img;
  return img.url ?? null;
};

/* ─────────────────────────────────────────
   ACCORDION ITEM
───────────────────────────────────────── */
function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e8d5b5]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3 sm:py-[13px] bg-transparent border-none cursor-pointer outline-none"
      >
        <span
          className="text-[10px] sm:text-[11px] tracking-[0.18em] text-[#3d1a00] font-semibold text-left"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          {title}
        </span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="#c9973a" strokeWidth="2"
          className="transition-transform duration-200 flex-shrink-0 ml-2"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0" }}
      >
        <p
          className="text-[13px] sm:text-[14px] text-[#666] leading-[1.7] pb-[13px] m-0"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          {children}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SKELETON LOADER
───────────────────────────────────────── */
const SkeletonDetail = () => (
  <div className="max-w-[1160px] mx-auto px-3 sm:px-6 md:px-10 pt-20 sm:pt-24 pb-8 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 items-start">
      <div className="bg-gray-200 rounded-md" style={{ aspectRatio: "3/4" }} />
      <div className="space-y-4 pt-4">
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-20 bg-gray-200 rounded w-full" />
        <div className="h-10 bg-gray-200 rounded w-full" />
        <div className="h-10 bg-gray-200 rounded w-full" />
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   RELATED CARD
───────────────────────────────────────── */
const RelatedCard = ({ product, idx, onNavigate }) => {
  const [imgErr, setImgErr] = useState(false);
  const rawImg = Array.isArray(product.images) ? resolveImg(product.images[0]) : resolveImg(product.image);
  const imgSrc = imgErr || !rawImg ? FALLBACK_IMGS[idx % 4] : rawImg;
  const price  = Number(product.discountPrice ?? product.discounted_price ?? product.price ?? 0);

  return (
    <div className="pd-related cursor-pointer" onClick={() => onNavigate(product._id)}>
      <div className="relative rounded overflow-hidden bg-[#f5ece0]" style={{ aspectRatio: "3/4" }}>
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => setImgErr(true)}
          className="pd-related-img w-full h-full object-cover block transition-transform duration-300 hover:scale-105"
        />
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border-none cursor-pointer flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.12)] outline-none"
        >
          <Heart size={11} className="text-[#c9973a]" />
        </button>
        <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 bg-white/90 rounded-xl px-[6px] py-[2px] flex items-center gap-[3px]">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="#f5a623">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="text-[10px] sm:text-[11px] text-[#333]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
            {(product.ratings || product.rating || 4.5).toFixed(1)}
          </span>
        </div>
      </div>
      <p className="text-[12px] sm:text-[13px] text-[#1a0800] font-semibold mt-1.5 sm:mt-2 mb-[3px] leading-snug line-clamp-1" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
        {product.name}
      </p>
      <p className="text-[13px] sm:text-[14px] text-[#3d1a00] font-bold m-0" style={{ fontFamily: '"Playfair Display", serif' }}>
        ₹{price.toLocaleString("en-IN")}
      </p>
    </div>
  );
};

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function ProductDetail() {
  const navigate = useNavigate();
  const { id }   = useParams();

  /* ── Data hooks ── */
  const { data: productData, isLoading, isError, error, refetch } = useGetProductByIdQuery(id, { skip: !id });
  const { data: allData } = useGetProductsQuery({});
  const [addToCart,      { isLoading: addingToCart }]  = useAddToCartMutation();
  const [addToWishlist,  { isLoading: addingToWish }]  = useAddToWishlistMutation();

  const relatedProducts = React.useMemo(() => {
    const list = Array.isArray(allData)
      ? allData
      : Array.isArray(allData?.data)
        ? allData.data
        : (allData?.products ?? []);
    return list.filter((p) => p._id !== id).slice(0, 5);
  }, [allData, id]);

  const product = productData?.data ?? productData?.product ?? productData ?? null;

  /* ── Local UI state ── */
  const [mainImg,       setMainImg]    = useState(0);
  const [selectedColor, setColor]     = useState(null);
  const [cartStatus,    setCartStatus] = useState("idle"); // idle | success | error
  const [wishStatus,    setWishStatus] = useState("idle"); // idle | success | error
  const [buyHov,        setBuyHov]    = useState(false);

  /* ── Loading ── */
  if (isLoading) {
    return <div className="bg-white min-h-screen"><Navbar /><SkeletonDetail /></div>;
  }

  /* ── Error ── */
  if (isError || !product) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
          <AlertCircle size={40} className="text-red-400" />
          <p className="text-gray-500 text-sm tracking-wide max-w-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {error?.data?.message || "Product not found."}
          </p>
          <div className="flex gap-3">
            <button
              onClick={refetch}
              className="text-[11px] tracking-[0.16em] uppercase px-5 py-2 border border-[#785822] text-[#785822] hover:bg-[#785822] hover:text-white transition-colors duration-200"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Retry
            </button>
            <button
              onClick={() => navigate("/products")}
              className="text-[11px] tracking-[0.16em] uppercase px-5 py-2 border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors duration-200"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Resolve fields ── */
  const rawImages = Array.isArray(product.images) && product.images.length
    ? product.images.map(resolveImg).filter(Boolean)
    : product.image
      ? [resolveImg(product.image)]
      : FALLBACK_IMGS;
  const images = rawImages.length ? rawImages : FALLBACK_IMGS;

  const colors = Array.isArray(product.colors) && product.colors.length
    ? product.colors
    : Array.isArray(product.variants) && product.variants.length
      ? product.variants.map((v) => ({ name: v.name, hex: null, price: v.price, image: resolveImg(v.image) }))
      : [{ name: "Default", hex: "#785822" }];

  const activeColor   = selectedColor ?? colors[0]?.name;
  const activeVariant = colors.find((c) => c.name === activeColor);

  const price    = Number(activeVariant?.price ?? product.discountPrice ?? product.discounted_price ?? product.price ?? 0);
  const mrp      = Number(product.price ?? product.original_price ?? product.mrp ?? price);
  const discount = mrp > price ? Math.round((1 - price / mrp) * 100) : 0;

  /* ── Build payload for cart API ── */
  const buildCartPayload = (qty = 1) => {
    return {
      productId: product._id,
      name:      product.name,
      price,
      image:     activeVariant?.image ?? images[mainImg],
      quantity:  qty,
      selectedVariant: {
        name: activeVariant?.name || "Default",
        color: activeVariant?.color || activeVariant?.name || "Default",
        fabric: activeVariant?.fabric || product?.fabric || "Silk",
      }
    };
  };

  /* ── Check if logged in ── */
  const isLoggedIn = () => {
    return !!localStorage.getItem("isLoggedIn");
  };

  /* ── Add to cart ── */
  const handleAddToCart = async () => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    try {
      await addToCart(buildCartPayload(1)).unwrap();
      setCartStatus("success");
      setTimeout(() => setCartStatus("idle"), 1500);
    } catch (e) {
      console.error("Add to cart failed", e);
      setCartStatus("error");
      setTimeout(() => setCartStatus("idle"), 1500);
    }
  };

  /* ── Add to wishlist ── */
  const handleAddToWishlist = async () => {
    if (!isLoggedIn()) { navigate("/login"); return; }
    try {
      await addToWishlist({
        productId:   product._id,
        name:        product.name,
        price,
        image:       activeVariant?.image ?? images[mainImg],
        rating:      Number(product.ratings ?? product.rating ?? 0),
        description: product.description ?? "",
      }).unwrap();
      setWishStatus("success");
      setTimeout(() => setWishStatus("idle"), 2000);
    } catch (e) {
      console.error("Add to wishlist failed", e);
      setWishStatus("error");
      setTimeout(() => setWishStatus("idle"), 2000);
    }
  };

  /* ── Buy now: add to cart then navigate ── */
  const handleBuyNow = async () => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    try {
      await addToCart(buildCartPayload(1)).unwrap();
      navigate("/checkout");
    } catch (e) {
      console.error("Buy now failed", e);
      navigate("/checkout"); // still navigate so user can checkout
    }
  };

  /* ── Button label / bg ── */
  const cartBtnLabel =
    addingToCart       ? "ADDING…"    :
    cartStatus === "success" ? "✓ ADDED"  :
    cartStatus === "error"   ? "FAILED"   :
    "ADD TO CART";

  const cartBtnBg =
    addingToCart            ? "#666"      :
    cartStatus === "success" ? "#2d7a2d"  :
    cartStatus === "error"   ? "#b91c1c"  :
    "linear-gradient(135deg,#3d1a00,#7a3d00)";

  return (
    <div className="bg-white min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Playfair+Display:wght@400;600;700&family=Cormorant+Garamond:wght@400;500;600&display=swap');
      `}</style>

      <Navbar />

      <div className="max-w-[1160px] mx-auto px-3 sm:px-6 md:px-10 pt-20 sm:pt-24 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 items-start">

          {/* LEFT — images */}
          <div className="flex gap-2 sm:gap-3">
            {/* Desktop thumbnails */}
            <div className="hidden sm:flex flex-col gap-2 flex-shrink-0">
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImg(i)}
                  className="w-[56px] h-[68px] md:w-[68px] md:h-[80px] rounded overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-200"
                  style={{ border: `2px solid ${i === mainImg ? "#c9973a" : "#e8d5b5"}` }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover block" />
                </div>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 rounded-md overflow-hidden bg-[#f5ece0] relative">
              <img
                src={images[mainImg]}
                alt={product.name}
                className="w-full object-cover block transition-opacity duration-300"
                style={{ aspectRatio: "3/4" }}
              />
              {discount > 0 && (
                <div
                  className="absolute top-2 sm:top-3 left-2 sm:left-3 text-white text-[8px] sm:text-[9px] tracking-[0.1em] px-2 sm:px-[10px] py-[3px] rounded-sm"
                  style={{ fontFamily: '"Cinzel", serif', background: "linear-gradient(135deg,#c9973a,#e8c46a)" }}
                >
                  {discount}% OFF
                </div>
              )}
              <button
                onClick={handleAddToWishlist}
                disabled={addingToWish}
                title={wishStatus === "success" ? "Added to wishlist!" : wishStatus === "error" ? "Failed" : "Add to Wishlist"}
                className="absolute top-2 sm:top-3 right-2 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all duration-200 hover:scale-110 disabled:opacity-60"
              >
                {addingToWish
                  ? <Loader2 size={13} className="animate-spin text-[#c9973a]" />
                  : <Heart
                      size={14}
                      fill={wishStatus === "success" ? "#c9973a" : "none"}
                      stroke={wishStatus === "error" ? "#b91c1c" : "#c9973a"}
                      strokeWidth={2}
                    />
                }
              </button>
            </div>
          </div>

          {/* Mobile thumbnails strip */}
          <div className="flex sm:hidden gap-2 overflow-x-auto pb-1 -mt-2">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setMainImg(i)}
                className="flex-shrink-0 w-[54px] h-[64px] rounded overflow-hidden cursor-pointer"
                style={{ border: `2px solid ${i === mainImg ? "#c9973a" : "#e8d5b5"}` }}
              >
                <img src={img} alt="" className="w-full h-full object-cover block" />
              </div>
            ))}
          </div>

          {/* RIGHT — product info */}
          <div>
            <p className="text-[10px] tracking-[0.25em] text-[#c9973a] mb-2 mt-0" style={{ fontFamily: '"Cinzel", serif' }}>
              {product.brand || product.category || "Silk Sarees"}
            </p>

            <h1 className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold text-[#1a0800] leading-tight mb-3 mt-0" style={{ fontFamily: '"Playfair Display", serif' }}>
              {product.name}
            </h1>

            <div className="flex items-baseline gap-2 sm:gap-3 mb-4 flex-wrap">
              <span className="text-[20px] sm:text-[22px] font-bold text-[#1a0800]" style={{ fontFamily: '"Playfair Display", serif' }}>
                ₹{price.toLocaleString("en-IN")}
              </span>
              {mrp > price && (
                <span className="text-[14px] sm:text-[15px] text-[#bbb] line-through" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                  ₹{mrp.toLocaleString("en-IN")}
                </span>
              )}
              {discount > 0 && (
                <span
                  className="text-[11px] sm:text-[12px] text-white px-2 py-[2px] rounded-sm"
                  style={{ fontFamily: '"Cinzel", serif', background: "linear-gradient(135deg,#c9973a,#e8c46a)" }}
                >
                  {discount}% OFF
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-[14px] sm:text-[15px] text-[#555] leading-[1.75] mb-5 mt-0" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                {product.description}
              </p>
            )}

            <div className="h-px mb-5" style={{ background: "linear-gradient(90deg,transparent,rgba(201,151,58,0.4),transparent)" }} />

            {/* Color / variant picker */}
            {colors.length > 0 && (
              <div className="mb-5 sm:mb-6">
                <p className="text-[10px] tracking-[0.18em] text-[#3d1a00] mb-[10px] mt-0" style={{ fontFamily: '"Cinzel", serif' }}>
                  VARIANT: <span className="text-[#c9973a]">{activeColor}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setColor(c.name)}
                      className="text-[10px] px-3 py-1.5 rounded-sm border transition-all duration-200"
                      style={{
                        fontFamily: '"Cinzel", serif',
                        borderColor:     activeColor === c.name ? "#c9973a" : "#e8d5b5",
                        backgroundColor: activeColor === c.name ? "#fdf3e0" : "transparent",
                        color:           activeColor === c.name ? "#c9973a" : "#3d1a00",
                      }}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex flex-col xs:flex-row gap-3 mb-5 sm:mb-6">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="flex-1 py-[13px] sm:py-[14px] text-[#e8c46a] text-[9px] sm:text-[10px] tracking-[0.2em] font-bold border-none rounded-sm cursor-pointer transition-all duration-300 outline-none disabled:opacity-70 flex items-center justify-center gap-2"
                style={{ fontFamily: '"Cinzel", serif', background: cartBtnBg }}
              >
                {addingToCart && <Loader2 size={12} className="animate-spin" />}
                {cartBtnLabel}
              </button>

              <button
                onClick={handleBuyNow}
                onMouseEnter={() => setBuyHov(true)}
                onMouseLeave={() => setBuyHov(false)}
                disabled={addingToCart}
                className="flex-1 py-[13px] sm:py-[14px] text-[9px] sm:text-[10px] tracking-[0.2em] font-semibold rounded-sm cursor-pointer transition-all duration-200 outline-none disabled:opacity-70"
                style={{
                  fontFamily: '"Cinzel", serif',
                  border: "1.5px solid #c9973a",
                  background: buyHov ? "#c9973a" : "transparent",
                  color: buyHov ? "#fff" : "#3d1a00",
                }}
              >
                BUY NOW →
              </button>
            </div>

            <AccordionItem title="PRODUCT DETAILS">
              {product.details ||
                `Fabric: ${product.fabric || "Pure Kanjivaram Silk"} · Category: ${product.category || "Saree"} · Occasion: ${product.occasion || "Wedding, Festivals"} · Care: Dry clean only · Stock: ${product.stock ?? "Available"}`}
            </AccordionItem>
            <AccordionItem title="DELIVERY & RETURNS">
              Free shipping on all orders above ₹999. Estimated delivery: 5–7 business days. Easy 7-day returns for unused items in original packaging.
            </AccordionItem>
            <AccordionItem title="DISCLAIMER">
              Colors may slightly vary due to photographic lighting. Minor irregularities are characteristic of authentic handloom work.
            </AccordionItem>
          </div>
        </div>
      </div>

      {/* ── YOU MAY LIKE ── */}
      {relatedProducts.length > 0 && (
        <div className="max-w-[1160px] mx-auto px-3 sm:px-6 md:px-10 pb-10">
          <div className="flex items-center justify-center gap-3 mb-5 sm:mb-7">
            <img src="/images/h1.png" alt="" aria-hidden="true" className="h-5 sm:h-7 w-auto object-contain opacity-60" style={{ transform: "scaleX(-1)" }} />
            <h2 className="font-normal tracking-[0.18em] uppercase text-[#1a1008] text-[18px] sm:text-[22px]" style={{ fontFamily: "'Ibarra Real Nova', serif" }}>
              You May Like
            </h2>
            <img src="/images/h1.png" alt="" aria-hidden="true" className="h-5 sm:h-7 w-auto object-contain opacity-60" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {relatedProducts.map((p, i) => (
              <RelatedCard
                key={p._id}
                product={p}
                idx={i}
                onNavigate={(pid) => {
                  navigate(`/products/${pid}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            ))}
          </div>
        </div>
      )}

      <section className="w-full mt-4 sm:mt-6">
        <img src="/footer.png" alt="Collection Banner" className="w-full h-auto object-cover block" />
      </section>
    </div>
  );
}
