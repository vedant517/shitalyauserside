import React, { useState } from 'react';

function Input({ placeholder, type = 'text', value, onChange }) {
  const [focus, setFocus] = useState(false);

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className="w-full px-4 py-3 sm:py-[12px] bg-[#faf8f5] rounded-md text-[14px] outline-none transition"
      style={{
        border: `1px solid ${focus ? '#b8963a' : '#d4c9bc'}`,
        color: '#3a2200',
        fontFamily: "'Cormorant Garamond', serif",
      }}
    />
  );
}

export default function Login() {
  const [mobile, setMobile] = useState('+91');
  const [otp, setOtp] = useState('');

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative px-3 sm:px-4"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundRepeat: 'repeat',
        backgroundSize: '800px',
        backgroundColor: '#efe4d6',
      }}
    >
      {/* LEFT MODEL */}
      <img
        src="/msaree.png"
        alt=""
        className="hidden lg:block absolute bottom-0 left-0 object-contain"
        style={{ height: '70vh', maxHeight: '650px' }}
      />

      {/* RIGHT MODEL */}
      <img
        src="/rightmsaree.png"
        alt=""
        className="hidden lg:block absolute bottom-0 right-0 object-contain"
        style={{ height: '60vh', maxHeight: '520px' }}
      />

      {/* CARD */}
      <div
        className="relative z-[2] w-full max-w-[95%] sm:max-w-[420px] md:max-w-[440px]"
        style={{
          background: 'rgba(255,255,255,0.97)',
          borderRadius: '18px',
          boxShadow: '0 14px 50px rgba(0,0,0,0.12)',
          padding: 'clamp(20px, 4vw, 32px) clamp(16px, 4vw, 24px)',
        }}
      >
        {/* LOGO */}
        <img
          src="/sheetalya logo.png"
          alt="Logo"
          className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full object-cover mx-auto mb-4"
        />

        {/* TITLE */}
        <h1
          className="text-center mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(24px, 5vw, 34px)',
          }}
        >
          Login
        </h1>

        {/* MOBILE */}
        <div className="text-left mb-5">
          <label className="text-[12px] sm:text-[13px] text-[#5a3e1b] mb-2 block">
            Mobile No
          </label>
          <Input value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </div>

        {/* OTP */}
        <div className="text-left mb-3">
          <label className="text-[12px] sm:text-[13px] text-[#5a3e1b] mb-2 block">
            OTP
          </label>
          <Input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
        </div>

        {/* RESEND */}
        <div className="text-right text-[11px] sm:text-[12px] text-[#777] mb-6">
          Didn’t receive OTP?{' '}
          <span className="text-[#c9973a] font-semibold cursor-pointer">
            RESEND
          </span>
        </div>

        {/* BUTTON */}
        <button
          className="w-full py-3 sm:py-[13px] text-white text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] rounded-md mb-5"
          style={{ background: '#8b7355' }}
        >
          LOGIN TO PROCEED →
        </button>

        {/* FOOTER */}
        <p className="text-[12px] sm:text-[13px] text-[#666] text-center">
          Don’t have an account?{' '}
          <a href="/createaccount" className="text-[#b8963a] font-semibold">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}