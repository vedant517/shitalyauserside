import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSendOtpMutation, useVerifyOtpMutation } from '../Redux/api/authApi';

function Input({ placeholder, type = 'text', value, onChange, disabled }) {
  const [focus, setFocus] = useState(false);

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className="w-full px-4 py-3 sm:py-[12px] bg-[#faf8f5] rounded-md text-[14px] outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        border: `1px solid ${focus ? '#b8963a' : '#d4c9bc'}`,
        color: '#3a2200',
        fontFamily: "'Cormorant Garamond', serif",
      }}
    />
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [mobile, setMobile]     = useState('+91');
  const [otp, setOtp]           = useState('');
  const [otpSent, setOtpSent]   = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');

  const [sendOtp,   { isLoading: sendingOtp }]   = useSendOtpMutation();
  const [verifyOtp, { isLoading: verifyingOtp }] = useVerifyOtpMutation();

  // Strip country code for sending — keeps raw digits only
  const getRawPhone = () => mobile.replace(/\D/g, '').replace(/^91/, '');

  const handleSendOtp = async () => {
    setError('');
    setSuccess('');
    const phone = getRawPhone();
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    try {
      await sendOtp(phone).unwrap();
      setOtpSent(true);
      setSuccess('OTP sent successfully!');
    } catch (err) {
      setError(err?.data?.message || 'Failed to send OTP. Please try again.');
    }
  };

  const handleResend = async () => {
    setOtp('');
    await handleSendOtp();
  };

  const handleLogin = async () => {
  setError('');
  setSuccess('');

  if (!otp || otp.length < 4) {
    setError('Please enter the OTP.');
    return;
  }

  const phone = getRawPhone();

  try {
    const res = await verifyOtp({
      phonenum: phone,
      otp,
    }).unwrap();

    console.log("LOGIN RESPONSE:", res);

    // ✅ save user if exists
    if (res?.user) {
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("isLoggedIn", "true");
      window.dispatchEvent(new Event("authChange"));
    }

    // ✅ check cookie
    console.log("COOKIE:", document.cookie);

    // wait little before navigation
    setTimeout(() => {
      navigate('/');
    }, 1000);

  } catch (err) {

    console.log("LOGIN ERROR:", err);

    setError(
      err?.data?.message ||
      'Invalid OTP. Please try again.'
    );
  }
};

  const isLoading = sendingOtp || verifyingOtp;

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

        {/* ERROR / SUCCESS */}
        {error && (
          <p className="text-red-500 text-[12px] text-center mb-3 -mt-2">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 text-[12px] text-center mb-3 -mt-2">
            {success}
          </p>
        )}

        {/* MOBILE */}
        <div className="text-left mb-5">
          <label className="text-[12px] sm:text-[13px] text-[#5a3e1b] mb-2 block">
            Mobile No
          </label>
          <div className="flex gap-2">
            <Input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              disabled={otpSent || isLoading}
            />
            {!otpSent && (
              <button
                onClick={handleSendOtp}
                disabled={isLoading}
                className="shrink-0 px-3 py-2 text-white text-[10px] tracking-widest rounded-md disabled:opacity-60"
                style={{ background: '#8b7355', whiteSpace: 'nowrap' }}
              >
                {sendingOtp ? 'SENDING…' : 'SEND OTP'}
              </button>
            )}
          </div>
        </div>

        {/* OTP — only shown after OTP is sent */}
        {otpSent && (
          <>
            <div className="text-left mb-3">
              <label className="text-[12px] sm:text-[13px] text-[#5a3e1b] mb-2 block">
                OTP
              </label>
              <Input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                type="number"
                disabled={isLoading}
              />
            </div>

            {/* RESEND */}
            <div className="text-right text-[11px] sm:text-[12px] text-[#777] mb-6">
              Didn't receive OTP?{' '}
              <span
                onClick={!isLoading ? handleResend : undefined}
                className={`text-[#c9973a] font-semibold ${isLoading ? 'opacity-50' : 'cursor-pointer'}`}
              >
                RESEND
              </span>
            </div>

            {/* LOGIN BUTTON */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full py-3 sm:py-[13px] text-white text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] rounded-md mb-5 disabled:opacity-60"
              style={{ background: '#8b7355' }}
            >
              {verifyingOtp ? 'VERIFYING…' : 'LOGIN TO PROCEED →'}
            </button>
          </>
        )}

        {/* If OTP not yet sent show a spacer */}
        {!otpSent && <div className="mb-5" />}

        {/* FOOTER */}
        <p className="text-[12px] sm:text-[13px] text-[#666] text-center">
          Don't have an account?{' '}
          <a href="/createaccount" className="text-[#b8963a] font-semibold">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}
