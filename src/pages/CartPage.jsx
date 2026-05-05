import React, { useState } from "react";
import { Trash2, Heart, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import NewsletterFooter from "../components/NewsLetterFooter";

const CartPage = () => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(2);
  const [coupon, setCoupon] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [qtyOpen, setQtyOpen] = useState(false);

  const subtotal = 18499;
  const delivery = 1;
  const payable = 10000;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&family=Cormorant+Garamond:wght@400;500;600&display=swap"
      />

      <Navbar />

      <div className="bg-white min-h-screen pt-[72px] font-['Outfit']">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

          {/* ── Top row: "Your Cart" left | "Apply Coupon … Apply" right ── */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">

            {/* Left: heading + bottom line */}
            <div className="pb-2" style={{ borderBottom: "1px solid #9383593B" }}>
              <h1 className="font-['Cormorant_Garamond'] text-[26px] sm:text-[30px] md:text-[34px] font-medium text-[#1a1008] whitespace-nowrap">
                Your Cart
              </h1>
            </div>

            {/* Right: coupon row + bottom line (no scissors icon) */}
            <div className="flex-1 max-w-full sm:max-w-[460px]">
              <div
                className="flex items-center gap-3 pb-2"
                style={{ borderBottom: "1px solid #9383593B" }}
              >
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
                <button className="text-[12px] sm:text-[13px] font-medium text-[#785822] hover:text-[#5c4118] transition-colors shrink-0">
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* ── Main content ── */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">

            {/* ── Left: Cart item — NO border ── */}
            <div className="flex-1 w-full">
              <div className="flex gap-4 sm:gap-5 p-0">

                {/* Product image */}
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=120&h=120&fit=crop"
                  alt="Royal Saree"
                  className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[110px] md:h-[110px] object-cover rounded-lg flex-shrink-0"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">

                  {/* Row 1: Name + 20% badge — badge shifted left (gap reduced, not pushed to far right) */}
                  <div className="flex items-start gap-3 mb-2">
                    <p className="text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#1a1008] leading-snug">
                      Royal Saree
                    </p>
                    <div className="bg-[#785822] text-white text-[10px] sm:text-[11px] font-medium rounded-full w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
                      20%
                    </div>
                  </div>

                  {/* Color */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[11px] sm:text-[12px] text-[#555]">Color :</span>
                    <div className="w-[14px] h-[14px] rounded-full bg-[#c8a05a] border border-[#e0c88a]" />
                    <span className="text-[11px] sm:text-[12px] text-[#555]">Yellow</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[14px] sm:text-[15px] md:text-[16px] font-medium text-[#1a1008]">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] sm:text-[12px] text-gray-400 line-through">
                      ₹18,499
                    </span>
                  </div>

                  {/* Delete & Wishlist — below price */}
                  <div className="flex items-center gap-3 mb-3">
                    <button className="text-[#c0392b] hover:scale-110 transition-transform">
                      <Trash2 size={18} />
                    </button>
                    <button className="text-gray-400 hover:text-[#FB2E86] hover:scale-110 transition-all">
                      <Heart size={18} />
                    </button>
                  </div>

                  {/* Qty — below delete/wishlist */}
                  <div className="relative inline-block">
                    <button
                      onClick={() => setQtyOpen((v) => !v)}
                      className="flex items-center gap-1 text-[12px] sm:text-[13px] text-[#1a1008] border border-[#e8dcc8] rounded px-3 py-1.5 hover:border-[#785822] transition-colors"
                    >
                      Qty : {qty}
                      <ChevronDown size={14} />
                    </button>
                    {qtyOpen && (
                      <div className="absolute top-9 left-0 bg-white border border-[#e8dcc8] rounded shadow-md z-10 min-w-[70px]">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <div
                            key={n}
                            onClick={() => { setQty(n); setQtyOpen(false); }}
                            className={`px-4 py-2 text-[12px] sm:text-[13px] cursor-pointer hover:bg-[#FFF5E2] transition-colors ${qty === n ? "bg-[#FFF5E2] font-medium" : ""}`}
                          >
                            {n}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>

            {/* ── Right: Order summary — NOT rounded ── */}
            <div className="w-full lg:w-[340px] xl:w-[360px]">

              <div className="bg-[#f5f0e8] rounded-none p-5 sm:p-6 mb-4">
                <p className="font-['Cormorant_Garamond'] text-[16px] sm:text-[17px] font-medium mb-4 text-[#1a1008]">
                  Order Summary
                </p>
                <div className="flex justify-between text-[12px] sm:text-[13px] text-[#9c8060] mb-2.5">
                  <span>Subtotal ( 2 Items )</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[12px] sm:text-[13px] text-[#9c8060] border-b border-[#e0d5c0] pb-3 mb-3">
                  <span>Delivery Charges</span>
                  <span>₹{delivery}</span>
                </div>
                <div className="flex justify-between text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#1a1008]">
                  <span>Payable Amount</span>
                  <span>₹{payable.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* T&C checkbox */}
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

              {/* Checkout button */}
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-[#8b7355] text-white py-3 sm:py-[14px] md:py-4 text-[11px] sm:text-[12px] tracking-[0.12em] uppercase transition hover:bg-[#6e5c42] rounded-sm"
              >
                Checkout To Proceed →
              </button>
            </div>

          </div>
        </div>
        <NewsletterFooter/>
      </div>
    </>
  );
};

export default CartPage;
