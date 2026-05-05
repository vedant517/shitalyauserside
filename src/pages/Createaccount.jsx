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
      className="w-full px-3 sm:px-4 py-[11px] sm:py-[12px] md:py-[13px] bg-white rounded-md text-[14px] md:text-[15px] outline-none transition"
      style={{
        border: `1px solid ${focus ? '#b8963a' : '#d4c9bc'}`,
        color: '#3a2200',
        fontFamily: "'Cormorant Garamond', serif",
      }}
    />
  );
}

export default function CreateAccount() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('+91');

  return (
    <div
      className="min-h-screen w-full overflow-hidden relative flex items-center justify-center py-10"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundRepeat: 'repeat',
        backgroundSize: '800px',
        backgroundColor: '#ede0d0',
      }}
    >
      {/* LEFT MODEL */}
      <img
        src="/msaree.png"
        alt=""
        className="hidden lg:block absolute bottom-0 left-0 z-[1]"
        style={{ height: '80vh', maxHeight: '650px' }}
      />

      {/* RIGHT MODEL */}
      <img
        src="/rightmsaree.png"
        alt=""
        className="hidden lg:block absolute bottom-0 right-0 z-[1]"
        style={{ height: '65vh', maxHeight: '520px' }}
      />

      {/* CARD */}
      <div
        className="relative z-[2] w-full mx-4 sm:mx-6"
        style={{
          maxWidth: '400px',
          background: 'rgba(255,255,255,0.97)',
          borderRadius: '18px',
          boxShadow: '0 14px 50px rgba(0,0,0,0.12)',
          padding: 'clamp(20px, 5vw, 32px) clamp(16px, 4vw, 24px) clamp(18px, 4vw, 28px)',
        }}
      >
        {/* LOGO */}
        <div className="mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] md:w-[64px] md:h-[64px]">
          <img
            src="/sheetalya logo.png"
            alt="Sheetalya"
            className="w-full h-full object-cover"
          />
        </div>

        {/* TITLE */}
        <h1
          className="text-[#1a0e00] mb-5 sm:mb-6 text-center"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(24px, 6vw, 34px)',
          }}
        >
          Create Account
        </h1>

        {/* NAME */}
        <div className="text-left mb-4 sm:mb-5">
          <label className="text-[12px] sm:text-[13px] text-[#5a3e1b] mb-1.5 sm:mb-2 block">
            Name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        {/* MOBILE */}
        <div className="text-left mb-5 sm:mb-6">
          <label className="text-[12px] sm:text-[13px] text-[#5a3e1b] mb-1.5 sm:mb-2 block">
            Mobile No
          </label>
          <Input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <button
          className="w-full py-[12px] sm:py-[13px] text-white text-[10px] sm:text-[11px] tracking-[0.2em] rounded-md mb-3 sm:mb-4"
          style={{ background: '#8b7355' }}
        >
          CREATE ACCOUNT →
        </button>

        {/* FOOTER */}
        <p className="text-[12px] sm:text-[13px] text-[#777] text-center">
          Already have an account?{' '}
          <a href="/login" className="text-[#b8963a] font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
