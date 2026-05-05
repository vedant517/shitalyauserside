import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    region: "",
    city: "",
    zip: "",
    email: "",
    phone: "",
    paymentMethod: "debit",
    nameOnCard: "",
    cardNumber: "",
    expireDate: "",
    cvc: "",
  });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const orderItems = [
    {
      id: 1,
      name: "Silk Saree",
      qty: 1,
      price: 70,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=80&h=80&fit=crop",
    },
    {
      id: 2,
      name: "Silk Saree",
      qty: 3,
      price: 250,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=80&h=80&fit=crop",
    },
  ];

  const subtotal = 320;
  const shipping = 0;
  const discount = 24;
  const total = 357.99;

  const paymentOptions = [
    { id: "cash", label: "Cash on Delivery", icon: "$", color: "#c8a05a" },
    { id: "venmo", label: "Venmo", icon: "V", color: "#3D95CE" },
    { id: "paypal", label: "Paypal", icon: "P", color: "#003087" },
    { id: "amazon", label: "Amazon Pay", icon: "A", color: "#FF9900" },
    { id: "debit", label: "Debit/Credit Card", icon: "💳", color: "#c8a05a" },
  ];

  const inputClass =
    "w-full border border-[#e0d5c0] rounded px-3 py-2 text-[13px] text-[#1a1008] outline-none focus:border-[#c8a05a] bg-white placeholder-gray-400 font-['Outfit']";

  const selectClass =
    "w-full border border-[#e0d5c0] rounded px-3 py-2 text-[13px] text-gray-400 outline-none focus:border-[#c8a05a] bg-white appearance-none font-['Outfit'] cursor-pointer";

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&family=Cormorant+Garamond:wght@400;500;600&display=swap"
      />

      <Navbar />

      <div className="min-h-screen bg-white pt-[72px] font-['Outfit']">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

          {/* ── Breadcrumb ── */}
          <div className="flex items-center gap-2 mb-5 sm:mb-6">
            <button
              onClick={() => navigate("/cart")}
              className="text-[13px] text-[#1a1008] hover:text-[#c8a05a] transition-colors"
            >
              Proceed To checkout →
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">

            {/* ── LEFT: Form ── */}
            <div className="flex-1 w-full min-w-0">

              {/* Billing Information */}
              <div className="border border-[#e0d5c0] rounded-lg p-4 sm:p-6 mb-5 sm:mb-6">
                <h2 className="text-[15px] sm:text-[16px] font-medium text-[#1a1008] mb-4 sm:mb-5 font-['Cormorant_Garamond']">
                  Billing Information
                </h2>

                {/* User Name */}
                <div className="mb-4">
                  <label className="block text-[12px] text-[#1a1008] mb-1.5">User name</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handle}
                      placeholder="First name"
                      className={inputClass}
                    />
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handle}
                      placeholder="Last name"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="mb-4">
                  <label className="block text-[12px] text-[#1a1008] mb-1.5">Address</label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handle}
                    className={inputClass}
                  />
                </div>

                {/* Country / Region / City / Zip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div>
                    <label className="block text-[12px] text-[#1a1008] mb-1.5">Country</label>
                    <div className="relative">
                      <select name="country" value={form.country} onChange={handle} className={selectClass}>
                        <option value="">Select...</option>
                        <option>India</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                      </select>
                      <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">▼</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#1a1008] mb-1.5">Region/State</label>
                    <div className="relative">
                      <select name="region" value={form.region} onChange={handle} className={selectClass}>
                        <option value="">Select...</option>
                        <option>Maharashtra</option>
                        <option>Delhi</option>
                        <option>Karnataka</option>
                      </select>
                      <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">▼</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#1a1008] mb-1.5">City</label>
                    <div className="relative">
                      <select name="city" value={form.city} onChange={handle} className={selectClass}>
                        <option value="">Select...</option>
                        <option>Mumbai</option>
                        <option>Pune</option>
                        <option>Bengaluru</option>
                      </select>
                      <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">▼</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#1a1008] mb-1.5">Zip Code</label>
                    <input
                      name="zip"
                      value={form.zip}
                      onChange={handle}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Email / Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] text-[#1a1008] mb-1.5">Email</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handle}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#1a1008] mb-1.5">Phone Number</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handle}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Option */}
              <div className="border border-[#e0d5c0] rounded-lg p-4 sm:p-6">
                <h2 className="text-[15px] sm:text-[16px] font-medium text-[#1a1008] mb-4 sm:mb-5 font-['Cormorant_Garamond']">
                  Payment Option
                </h2>

                {/* Payment Icons Row */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-5">
                  {paymentOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className="flex flex-col items-center gap-1.5 cursor-pointer"
                    >
                      {/* Icon Box */}
                      <div className="w-full border border-[#e0d5c0] rounded py-3 flex items-center justify-center text-[20px] hover:border-[#c8a05a] transition-colors bg-white">
                        {opt.id === "cash" && (
                          <span style={{ color: opt.color, fontWeight: 700, fontSize: "18px" }}>$</span>
                        )}
                        {opt.id === "venmo" && (
                          <span style={{ color: opt.color, fontWeight: 700, fontSize: "18px" }}>V</span>
                        )}
                        {opt.id === "paypal" && (
                          <span style={{ color: opt.color, fontWeight: 700, fontSize: "18px", fontStyle: "italic" }}>P</span>
                        )}
                        {opt.id === "amazon" && (
                          <span style={{ color: opt.color, fontWeight: 700, fontSize: "18px" }}>A</span>
                        )}
                        {opt.id === "debit" && (
                          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                            <rect x="0.5" y="0.5" width="21" height="15" rx="2.5" stroke="#c8a05a" />
                            <rect y="4" width="22" height="3" fill="#c8a05a" opacity="0.3" />
                            <rect x="2" y="9" width="6" height="1.5" rx="0.75" fill="#c8a05a" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[10px] text-[#1a1008] text-center leading-tight">{opt.label}</span>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={opt.id}
                        checked={form.paymentMethod === opt.id}
                        onChange={handle}
                        className="accent-[#c8a05a] w-3.5 h-3.5"
                      />
                    </label>
                  ))}
                </div>

                {/* Card Fields — shown when debit selected */}
                {form.paymentMethod === "debit" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[12px] text-[#1a1008] mb-1.5">Name on Card</label>
                      <input
                        name="nameOnCard"
                        value={form.nameOnCard}
                        onChange={handle}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#1a1008] mb-1.5">Card Number</label>
                      <input
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handle}
                        maxLength={19}
                        className={inputClass}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[12px] text-[#1a1008] mb-1.5">Expire Date</label>
                        <input
                          name="expireDate"
                          value={form.expireDate}
                          onChange={handle}
                          placeholder="DD/YY"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#1a1008] mb-1.5">CVC</label>
                        <input
                          name="cvc"
                          value={form.cvc}
                          onChange={handle}
                          maxLength={4}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* ── RIGHT: Order Summary ── */}
            <div className="w-full lg:w-[320px] lg:flex-shrink-0">
              <div className="border border-[#e0d5c0] rounded-lg p-4 sm:p-5">
                <h2 className="font-['Cormorant_Garamond'] text-[15px] sm:text-[16px] font-medium text-[#1a1008] mb-4">
                  Order Summery
                </h2>

                {/* Items */}
                <div className="space-y-4 mb-5">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded flex-shrink-0"
                      />
                      <div>
                        <p className="text-[13px] font-medium text-[#1a1008]">{item.name}</p>
                        <p className="text-[12px] text-[#c8a05a]">
                          {item.qty} x ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-[#e0d5c0] mb-4" />

                {/* Breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-[13px] text-[#555]">
                    <span>Sub-total</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[13px] text-[#555]">
                    <span>Shipping</span>
                    <span className="text-[#1a1008]">Free</span>
                  </div>
                  <div className="flex justify-between text-[13px] text-[#555]">
                    <span>Discount</span>
                    <span>${discount}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#e0d5c0] mb-4" />

                {/* Total */}
                <div className="flex justify-between items-center mb-5">
                  <span className="text-[14px] font-medium text-[#1a1008]">Total</span>
                  <span className="text-[15px] font-semibold text-[#1a1008]">
                    ${total.toFixed(2)} USD
                  </span>
                </div>

                {/* Place Order */}
                <button className="w-full bg-[#8b7355] hover:bg-[#6e5c42] transition-colors text-white py-3 text-[12px] tracking-[0.12em] uppercase font-medium flex items-center justify-center gap-2 rounded">
                  Place Order →
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
