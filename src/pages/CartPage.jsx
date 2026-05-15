import React, { useState } from "react";
import { Trash2, Heart, ChevronDown, Loader2, AlertCircle, ShoppingCart, Tag, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import NewsletterFooter from "../components/NewsLetterFooter";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useAddToCartMutation,
} from "../Redux/api/cartApi";
import { useApplyCouponMutation, useGetCouponsQuery } from "../Redux/api/couponApi";

/* ─────────────────────────────────────────
   QUANTITY DROPDOWN (per item)
───────────────────────────────────────── */
const QtyDropdown = ({ current, item, onQtyChange, disabled }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={disabled}
        className="flex items-center gap-1 text-[12px] sm:text-[13px] text-[#1a1008] border border-[#e8dcc8] rounded px-3 py-1.5 hover:border-[#785822] transition-colors disabled:opacity-50"
      >
        Qty : {current}
        <ChevronDown size={14} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-9 left-0 bg-white border border-[#e8dcc8] rounded shadow-md z-20 min-w-[70px]">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                onClick={() => {
                  setOpen(false);
                  if (n !== current) onQtyChange(item, n);
                }}
                className={`px-4 py-2 text-[12px] sm:text-[13px] cursor-pointer hover:bg-[#FFF5E2] transition-colors ${
                  current === n ? "bg-[#FFF5E2] font-medium" : ""
                }`}
              >
                {n}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────
   SINGLE CART ITEM ROW
───────────────────────────────────────── */
const CartItem = ({ item, onRemove, onQtyChange, removing }) => {
  const price    = Number(item.discountPrice ?? item.price ?? 0);
  const original = Number(item.mrp ?? item.originalPrice ?? item.price ?? 0);
  const discount = original > price ? Math.round((1 - price / original) * 100) : 0;

  const imgSrc =
    item.image?.url ?? item.image ?? item.thumbnail ??
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=120&h=120&fit=crop";

  const cartItemId = item._id ?? item.id ?? item.cartItemId;

  return (
    <div className="flex gap-4 sm:gap-5 py-5 border-b border-[#9383593B] last:border-0">
      {/* Image */}
      <img
        src={imgSrc}
        alt={item.name}
        className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[110px] md:h-[110px] object-cover rounded-lg flex-shrink-0"
      />

      {/* Details */}
      <div className="flex-1 min-w-0">
        {/* Name + discount badge */}
        <div className="flex items-start gap-3 mb-2">
          <p className="text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#1a1008] leading-snug flex-1">
            {item.name}
          </p>
          {discount > 0 && (
            <div className="bg-[#785822] text-white text-[10px] sm:text-[11px] font-medium rounded-full w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
              {discount}%
            </div>
          )}
        </div>

        {/* Color */}
        {item.color && (
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[11px] sm:text-[12px] text-[#555]">Color :</span>
            {item.colorHex && (
              <div
                className="w-[14px] h-[14px] rounded-full border border-[#e0c88a]"
                style={{ backgroundColor: item.colorHex }}
              />
            )}
            <span className="text-[11px] sm:text-[12px] text-[#555]">{item.color}</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[14px] sm:text-[15px] md:text-[16px] font-medium text-[#1a1008]">
            ₹{price.toLocaleString("en-IN")}
          </span>
          {original > price && (
            <span className="text-[11px] sm:text-[12px] text-gray-400 line-through">
              ₹{original.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => onRemove(cartItemId)}
            disabled={removing}
            className="text-[#c0392b] hover:scale-110 transition-transform disabled:opacity-40"
          >
            {removing ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
          </button>
          <button className="text-gray-400 hover:text-[#FB2E86] hover:scale-110 transition-all">
            <Heart size={18} />
          </button>
        </div>

        {/* Qty */}
        <QtyDropdown
          current={item.quantity ?? 1}
          item={item}
          onQtyChange={onQtyChange}
          disabled={removing}
        />
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   CART PAGE
───────────────────────────────────────── */
const CartPage = () => {
  const navigate = useNavigate();
  const [coupon,     setCoupon]     = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [agreed,     setAgreed]     = useState(false);
  const [removingId, setRemovingId] = useState(null);

  /* ── RTK hooks ── */
  const { data: cartItems = [], isLoading, isError, refetch } = useGetCartQuery();
  const { data: availableCoupons = [] } = useGetCouponsQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [addToCart]      = useAddToCartMutation();
  const [applyCoupon, { isLoading: isApplying }] = useApplyCouponMutation();

  /* ── Remove handler ── */
  const handleRemove = async (cartItemId) => {
    setRemovingId(cartItemId);
    try {
      await removeFromCart(cartItemId).unwrap();
    } catch (e) {
      console.error("Remove failed", e);
    } finally {
      setRemovingId(null);
    }
  };

  /* ── Qty update ── */
  const handleQtyChange = async (item, newQty) => {
    const cartItemId = item._id ?? item.id ?? item.cartItemId;
    try {
      await removeFromCart(cartItemId).unwrap();
      await addToCart({
        productId: item.productId ?? item._id,
        name:      item.name,
        price:     item.price,
        image:     item.image?.url ?? item.image,
        quantity:  newQty,
      }).unwrap();
    } catch (e) {
      console.error("Qty update failed", e);
    }
  };

  /* ── Apply Coupon handler ── */
  const handleApplyCoupon = async () => {
    setCouponError("");
    if (!coupon.trim()) return;

    try {
      const res = await applyCoupon({
        code: coupon.trim(),
        cartItems: cartItems.map(item => ({
          productId: item.productId ?? item._id,
          price: item.price,
          quantity: item.quantity
        }))
      }).unwrap();

      setAppliedCoupon(res);
      setCoupon("");
    } catch (err) {
      setCouponError(err?.data?.message || "Invalid coupon code");
      setAppliedCoupon(null);
    }
  };

  /* ── Totals (derived from API data) ── */
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price ?? 0) * (item.quantity ?? 1),
    0
  );

  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const delivery = subtotal > 999 ? 0 : 99;
  const payable  = subtotal - discountAmount + delivery;

  /* ── Loading ── */
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white pt-[72px] flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-[#785822]" />
        </div>
      </>
    );
  }

  /* ── Error ── */
  if (isError) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white pt-[72px] flex flex-col items-center justify-center gap-4">
          <AlertCircle size={36} className="text-red-400" />
          <p className="text-gray-500 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Failed to load cart. Please try again.
          </p>
          <button
            onClick={refetch}
            className="text-[11px] tracking-[0.16em] uppercase px-6 py-2 border border-[#785822] text-[#785822] hover:bg-[#785822] hover:text-white transition-colors"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Retry
          </button>
        </div>
      </>
    );
  }

  /* ── Empty cart ── */
  if (cartItems.length === 0) {
    return (
      <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&family=Cormorant+Garamond:wght@400;500;600&display=swap" />
        <Navbar />
        <div className="min-h-screen bg-white pt-[72px] flex flex-col items-center justify-center gap-5">
          <ShoppingCart size={48} className="text-[#d4c9bc]" />
          <p
            className="text-[#9c8060] text-[15px] tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Your cart is empty
          </p>
          <button
            onClick={() => navigate("/products")}
            className="text-[11px] tracking-[0.2em] uppercase px-8 py-3 bg-[#8b7355] text-white hover:bg-[#6e5c42] transition-colors"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Shop Now →
          </button>
        </div>
        <NewsletterFooter />
      </>
    );
  }

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&family=Cormorant+Garamond:wght@400;500;600&display=swap" />
      <Navbar />

      <div className="bg-white min-h-screen pt-[72px] font-['Outfit']">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

          {/* ── Top row ── */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="pb-2" style={{ borderBottom: "1px solid #9383593B" }}>
              <h1 className="font-['Cormorant_Garamond'] text-[26px] sm:text-[30px] md:text-[34px] font-medium text-[#1a1008] whitespace-nowrap">
                Your Cart ({cartItems.length})
              </h1>
            </div>

            {/* Coupon */}
            <div className="flex-1 max-w-full sm:max-w-[460px]">
              <div className="flex items-center gap-3 pb-2" style={{ borderBottom: "1px solid #9383593B" }}>
                <span className="text-[13px] sm:text-[14px] font-bold text-[#1a1008] flex-1">
                  Apply Coupon
                </span>
                <input
                  type="text"
                  placeholder="Enter code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="outline-none text-[12px] sm:text-[13px] bg-transparent placeholder-gray-400 w-[100px] sm:w-[120px]"
                />
                <button 
                  onClick={handleApplyCoupon}
                  disabled={isApplying || !coupon.trim()}
                  className="text-[12px] sm:text-[13px] font-medium text-[#785822] hover:text-[#5c4118] transition-colors shrink-0 disabled:opacity-50"
                >
                  {isApplying ? "..." : "Apply"}
                </button>
              </div>
              {couponError && <p className="text-red-500 text-[11px] mt-1">{couponError}</p>}
              {appliedCoupon && (
                <div className="flex items-center gap-2 mt-1 text-green-600">
                  <CheckCircle2 size={12} />
                  <p className="text-[11px]">Coupon Applied: {appliedCoupon.code} (-₹{appliedCoupon.discount})</p>
                </div>
              )}
            </div>
          </div>

          {/* ── Main content ── */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">

            {/* ── Left: Cart items ── */}
            <div className="flex-1 w-full">
              {cartItems.map((item) => {
                const cartItemId = item._id ?? item.id ?? item.cartItemId;
                return (
                  <CartItem
                    key={cartItemId}
                    item={item}
                    onRemove={handleRemove}
                    onQtyChange={handleQtyChange}
                    removing={removingId === cartItemId}
                  />
                );
              })}
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="w-full lg:w-[340px] xl:w-[360px] lg:sticky lg:top-[100px]">
              <div className="bg-[#f5f0e8] rounded-none p-5 sm:p-6 mb-4">
                <p className="font-['Cormorant_Garamond'] text-[16px] sm:text-[17px] font-medium mb-4 text-[#1a1008]">
                  Order Summary
                </p>

                <div className="flex justify-between text-[12px] sm:text-[13px] text-[#9c8060] mb-2.5">
                  <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[12px] sm:text-[13px] text-green-600 mb-2.5">
                    <span>Discount</span>
                    <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-[12px] sm:text-[13px] text-[#9c8060] border-b border-[#e0d5c0] pb-3 mb-3">
                  <span>Delivery Charges</span>
                  <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
                </div>
                <div className="flex justify-between text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#1a1008]">
                  <span>Payable Amount</span>
                  <span>₹{payable.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* T&C */}
              <label className="flex items-center gap-2 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-[14px] h-[14px] accent-[#785822]"
                />
                <span className="text-[11px] sm:text-[12px] text-[#555]">
                  I agree to terms &amp; conditions
                </span>
              </label>

              <button
                onClick={() => navigate("/checkout")}
                disabled={!agreed}
                className="w-full bg-[#8b7355] text-white py-3 sm:py-[14px] md:py-4 text-[11px] sm:text-[12px] tracking-[0.12em] uppercase transition hover:bg-[#6e5c42] rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Checkout To Proceed →
              </button>
            </div>
          </div>
        </div>
        <NewsletterFooter />
      </div>
    </>
  );
};

export default CartPage;

