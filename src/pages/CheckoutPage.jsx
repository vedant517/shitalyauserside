import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { usePlaceOrderMutation } from "../Redux/api/orderApi";
import Navbar from "../components/Navbar";
import { Loader2, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

const TAX_RATE      = 0.18;
const FREE_SHIP_MIN = 999;
const SHIP_COST     = 99;

const fmt = (n) =>
  Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 });

/* ── Reusable input field ── */
const Field = ({ label, name, value, onChange, type = "text", required, placeholder }) => (
  <div className="flex flex-col gap-1">
    <label
      className="text-[10px] tracking-[0.18em] uppercase text-[#785822]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {label}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="border border-[#e8d5b5] rounded-sm px-3 py-2.5 text-[13px] text-[#1a0800] outline-none focus:border-[#c9973a] transition-colors duration-200 bg-white"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    />
  </div>
);

/* ── Order item row ── */
const OrderItemRow = ({ item }) => (
  <div className="flex items-center gap-3 py-3 border-b border-[#f0e4d0] last:border-0">
    <div className="w-14 h-16 rounded overflow-hidden bg-[#f5ece0] flex-shrink-0">
      {item.image
        ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        : <div className="w-full h-full bg-[#f0ebe2]" />}
    </div>
    <div className="flex-1 min-w-0">
      <p
        className="text-[13px] text-[#1a0800] font-medium leading-snug line-clamp-2"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {item.name}
      </p>
      {item.color && item.color !== "Default" && (
        <p className="text-[11px] text-[#999] mt-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {item.color}
        </p>
      )}
      <p className="text-[11px] text-[#785822] mt-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
        Qty: {item.quantity}
      </p>
    </div>
    <p className="text-[13px] font-semibold text-[#1a0800] flex-shrink-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
      ₹{fmt(item.price * item.quantity)}
    </p>
  </div>
);

/* ── Success screen ── */
const SuccessScreen = ({ orderId, onContinue }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 px-4 text-center">
    <CheckCircle2 size={56} className="text-green-500" />
    <h2
      className="text-[22px] sm:text-[26px] font-bold text-[#1a0800]"
      style={{ fontFamily: '"Playfair Display", serif' }}
    >
      Order Placed!
    </h2>
    <p
      className="text-[13px] text-[#555] max-w-xs leading-relaxed"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      Thank you for your purchase. Your order has been confirmed.
    </p>
    {orderId && (
      <p
        className="text-[11px] tracking-[0.15em] text-[#785822] bg-[#fdf3e0] px-4 py-2 rounded-sm"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        ORDER ID: {orderId}
      </p>
    )}
    <button
      onClick={onContinue}
      className="mt-2 px-8 py-3 text-[11px] tracking-[0.2em] uppercase text-white transition-colors duration-200"
      style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg,#3d1a00,#7a3d00)" }}
    >
      Continue Shopping
    </button>
  </div>
);

/* ─────────────────────────────────────────
   MAIN CHECKOUT PAGE
───────────────────────────────────────── */
export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();

  /* ── FIX: Read cart items from Redux store (same source as CartDrawer) ──
     Falls back to location.state if Redux slice isn't set up yet          */
  const reduxCartItems = useSelector((state) => state.cart?.items ?? []);
  const cartItems = reduxCartItems.length > 0
    ? reduxCartItems
    : (location.state?.cartItems ?? []);

  const [placeOrder, { isLoading, isError, error, isSuccess, data: orderResponse }] =
    usePlaceOrderMutation();

  const INITIAL_ADDR = {
    fullName: "", address: "", city: "",
    postalCode: "", country: "India", phone: "",
  };
  const [addr,          setAddr]        = useState(INITIAL_ADDR);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [summaryOpen,   setSummaryOpen]   = useState(true);
  const [formError,     setFormError]     = useState("");

  /* ── Price calculations (match curl body exactly) ── */
  const itemsPrice    = useMemo(() =>
    parseFloat(cartItems.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2)),
    [cartItems]
  );
  const taxPrice      = useMemo(() =>
    parseFloat((itemsPrice * TAX_RATE).toFixed(2)),
    [itemsPrice]
  );
  const shippingPrice = itemsPrice >= FREE_SHIP_MIN ? 0 : SHIP_COST;
  const totalPrice    = parseFloat((itemsPrice + taxPrice + shippingPrice).toFixed(2));

  const handleAddrChange = (e) => {
    setAddr((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError("");
  };

  const validate = () => {
    const required = {
      fullName:   "Full Name",
      address:    "Address",
      city:       "City",
      postalCode: "Postal Code",
      country:    "Country",
      phone:      "Phone",
    };
    for (const [key, label] of Object.entries(required)) {
      if (!addr[key].trim()) { setFormError(`Please fill in ${label}.`); return false; }
    }
    if (!/^\d{6}$/.test(addr.postalCode)) { setFormError("Postal code must be 6 digits."); return false; }
    if (!/^\d{10}$/.test(addr.phone))     { setFormError("Phone must be 10 digits."); return false; }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;

    /* ── Payload mapped exactly to curl fields ──
       item.id       → product   (MongoDB _id)
       item.name     → name
       item.quantity → qty
       item.image    → image
       item.price    → price
    ── */
    const orderItems = cartItems.map((item) => ({
      product: item.id,
      name:    item.name,
      qty:     item.quantity,
      image:   item.image || "",
      price:   item.price,
    }));

    const payload = {
      orderItems,
      shippingAddress: {
        fullName:   addr.fullName.trim(),
        address:    addr.address.trim(),
        city:       addr.city.trim(),
        postalCode: addr.postalCode.trim(),
        country:    addr.country.trim(),
        phone:      addr.phone.trim(),
      },
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    };

    try {
      await placeOrder(payload).unwrap();
    } catch (_) {
      // isError handles UI feedback
    }
  };

  /* ── Success screen ── */
  if (isSuccess) {
    const orderId = orderResponse?.order?._id ?? orderResponse?._id ?? null;
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="pt-[72px]">
          <SuccessScreen orderId={orderId} onContinue={() => navigate("/products")} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfaf5] min-h-screen" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Cinzel:wght@400;600&family=Outfit:wght@300;400;500;600&display=swap');`}</style>

      <Navbar />

      <div className="max-w-[1100px] mx-auto px-3 sm:px-6 md:px-10 pt-[88px] pb-16">

        {/* Page heading */}
        <div className="text-center mb-8 sm:mb-10">
          <p
            className="text-[10px] tracking-[0.3em] text-[#785822] mb-1"
            style={{ fontFamily: '"Cinzel", serif' }}
          >
            SECURE CHECKOUT
          </p>
          <h1
            className="text-[24px] sm:text-[30px] font-bold text-[#1a0800]"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Complete Your Order
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 lg:gap-10 items-start">

          {/* ── LEFT: Shipping + Payment ── */}
          <div className="space-y-6">

            {/* Shipping Address */}
            <div className="bg-white rounded-xl border border-[#e8d5b5] p-5 sm:p-7">
              <h2
                className="text-[11px] tracking-[0.22em] uppercase text-[#785822] mb-5"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field label="Full Name"   name="fullName"   required value={addr.fullName}   onChange={handleAddrChange} placeholder="John Doe" />
                </div>
                <div className="sm:col-span-2">
                  <Field label="Address"     name="address"    required value={addr.address}    onChange={handleAddrChange} placeholder="123 Main St, Apartment 4B" />
                </div>
                <Field label="City"        name="city"       required value={addr.city}       onChange={handleAddrChange} placeholder="Mumbai" />
                <Field label="Postal Code" name="postalCode" required value={addr.postalCode} onChange={handleAddrChange} placeholder="400001" />
                <Field label="Country"     name="country"    required value={addr.country}    onChange={handleAddrChange} placeholder="India" />
                <Field label="Phone"       name="phone"      required value={addr.phone}      onChange={handleAddrChange} placeholder="9876543210" type="tel" />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl border border-[#e8d5b5] p-5 sm:p-7">
              <h2
                className="text-[11px] tracking-[0.22em] uppercase text-[#785822] mb-5"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                Payment Method
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                {[
                  { value: "cod",    label: "Cash on Delivery", sub: "Pay when delivered", icon: "💵" },
                  { value: "online", label: "Online Payment",   sub: "Cards, UPI, Wallets", icon: "💳" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setPaymentMethod(opt.value)}
                    className="flex-1 flex items-center gap-3 px-4 py-3 rounded border-2 transition-all duration-200 text-left"
                    style={{
                      borderColor:     paymentMethod === opt.value ? "#c9973a" : "#e8d5b5",
                      backgroundColor: paymentMethod === opt.value ? "#fdf3e0" : "white",
                    }}
                  >
                    <span className="text-xl">{opt.icon}</span>
                    <div>
                      <p
                        className="text-[12px] font-medium"
                        style={{ color: paymentMethod === opt.value ? "#c9973a" : "#1a0800", fontFamily: "'Outfit', sans-serif" }}
                      >
                        {opt.label}
                      </p>
                      <p className="text-[10px] text-[#999]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {opt.sub}
                      </p>
                    </div>
                    <div
                      className="ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: paymentMethod === opt.value ? "#c9973a" : "#ccc" }}
                    >
                      {paymentMethod === opt.value && (
                        <div className="w-2 h-2 rounded-full bg-[#c9973a]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className="bg-white rounded-xl border border-[#e8d5b5] overflow-hidden lg:sticky lg:top-[88px]">

            {/* Toggle header */}
            <button
              className="w-full flex items-center justify-between px-5 py-4 border-b border-[#f0e4d0]"
              onClick={() => setSummaryOpen((v) => !v)}
            >
              <span
                className="text-[11px] tracking-[0.22em] uppercase text-[#785822]"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                Order Summary ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})
              </span>
              {summaryOpen
                ? <ChevronUp size={14} className="text-[#785822]" />
                : <ChevronDown size={14} className="text-[#785822]" />}
            </button>

            {/* Items */}
            {summaryOpen && (
              <div className="px-5 max-h-[280px] overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="py-8 text-center">
                    <p
                      className="text-[13px] text-gray-400 mb-2"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      No items in cart.
                    </p>
                    <button
                      onClick={() => navigate("/products")}
                      className="text-[11px] tracking-[0.15em] uppercase text-[#785822] border border-[#785822] px-4 py-1.5 hover:bg-[#785822] hover:text-white transition-colors"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Shop Now
                    </button>
                  </div>
                ) : (
                  cartItems.map((item, i) => (
                    <OrderItemRow key={`${item.id}-${item.color ?? ""}-${i}`} item={item} />
                  ))
                )}
              </div>
            )}

            {/* Price breakdown */}
            <div className="px-5 py-4 border-t border-[#f0e4d0] space-y-2.5">
              {[
                { label: "Items Price",               value: `₹${fmt(itemsPrice)}`    },
                { label: `GST (${TAX_RATE * 100}%)`,  value: `₹${fmt(taxPrice)}`      },
                { label: "Shipping",                  value: shippingPrice === 0 ? "FREE" : `₹${fmt(shippingPrice)}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-[12px] text-[#888]" style={{ fontFamily: "'Outfit', sans-serif" }}>{label}</span>
                  <span className="text-[12px] text-[#1a0800]" style={{ fontFamily: "'Outfit', sans-serif" }}>{value}</span>
                </div>
              ))}

              <div className="flex justify-between pt-2 border-t border-[#f0e4d0] mt-1">
                <span
                  className="text-[13px] font-semibold text-[#1a0800]"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Total
                </span>
                <span
                  className="text-[15px] font-bold text-[#c9973a]"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  ₹{fmt(totalPrice)}
                </span>
              </div>

              {itemsPrice > 0 && itemsPrice < FREE_SHIP_MIN && (
                <p className="text-[10px] text-[#999] text-center pt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Add ₹{fmt(FREE_SHIP_MIN - itemsPrice)} more for free shipping
                </p>
              )}
            </div>

            {/* Error banner */}
            {(formError || isError) && (
              <div className="mx-5 mb-3 flex items-start gap-2 bg-red-50 border border-red-200 rounded px-3 py-2.5">
                <AlertCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-red-500 leading-snug" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {formError || error?.data?.message || "Something went wrong. Please try again."}
                </p>
              </div>
            )}

            {/* CTA — enabled even with empty cart so user sees the message */}
            <div className="px-5 pb-5">
              <button
                onClick={handlePlaceOrder}
                disabled={isLoading}
                className="w-full py-[14px] text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#e8c46a] font-bold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ fontFamily: '"Cinzel", serif', background: "linear-gradient(135deg,#3d1a00,#7a3d00)" }}
              >
                {isLoading && <Loader2 size={14} className="animate-spin" />}
                {isLoading
                  ? "Placing Order…"
                  : cartItems.length === 0
                    ? "Add Items to Order"
                    : `Place Order · ₹${fmt(totalPrice)}`}
              </button>
              <p className="text-center text-[10px] text-[#bbb] mt-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                🔒 Secure & Encrypted Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}