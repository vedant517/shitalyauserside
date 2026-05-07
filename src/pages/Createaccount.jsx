import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation, useSendOtpMutation, useVerifyOtpMutation } from '../Redux/api/authApi';

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
      className="w-full px-3 sm:px-4 py-[11px] sm:py-[12px] md:py-[13px] bg-white rounded-md text-[14px] md:text-[15px] outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        border: `1px solid ${focus ? '#b8963a' : '#d4c9bc'}`,
        color: '#3a2200',
        fontFamily: "'Cormorant Garamond', serif",
      }}
    />
  );
}

// 3 steps: DETAILS → OTP → DONE
const STEP = { DETAILS: 'details', OTP: 'otp', DONE: 'done' };

export default function CreateAccount() {
  const navigate = useNavigate();
  const [step, setStep]       = useState(STEP.DETAILS);
  const [name, setName]       = useState('');
  const [mobile, setMobile]   = useState('+91');
  const [otp, setOtp]         = useState('');
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');

  const [register,  { isLoading: registering }]  = useRegisterMutation();
  const [sendOtp,   { isLoading: sendingOtp }]   = useSendOtpMutation();
  const [verifyOtp, { isLoading: verifyingOtp }] = useVerifyOtpMutation();

  const getRawPhone = () => mobile.replace(/\D/g, '').replace(/^91/, '');

  const isLoading = registering || sendingOtp || verifyingOtp;

  /* ── STEP 1: Register + Send OTP ─────────────────────── */
  const handleCreateAccount = async () => {
    setError('');
    setSuccess('');
    const phone = getRawPhone();

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      // Register the user
      await register({ name: name.trim(), phonenum: phone }).unwrap();
      // Then send OTP for verification
      await sendOtp(phone).unwrap();
      setSuccess('Account created! OTP sent to your mobile.');
      setStep(STEP.OTP);
    } catch (err) {
      setError(err?.data?.message || 'Registration failed. Please try again.');
    }
  };

  /* ── STEP 2: Verify OTP ───────────────────────────────── */
  const handleVerifyOtp = async () => {
    setError('');
    setSuccess('');
    if (!otp || otp.length < 4) {
      setError('Please enter the OTP.');
      return;
    }
    const phone = getRawPhone();
    try {
      const res = await verifyOtp({ phonenum: phone, otp }).unwrap();
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }
      // Immediately redirect to home page on success
      navigate('/');
    } catch (err) {
      setError(err?.data?.message || 'Invalid OTP. Please try again.');
    }
  };

  const handleResend = async () => {
    setOtp('');
    setError('');
    setSuccess('');
    try {
      await sendOtp(getRawPhone()).unwrap();
      setSuccess('OTP resent successfully!');
    } catch (err) {
      setError(err?.data?.message || 'Failed to resend OTP.');
    }
  };

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
          {step === STEP.OTP ? 'Verify OTP' : 'Create Account'}
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

        {/* ── STEP 1: DETAILS ── */}
        {step === STEP.DETAILS && (
          <>
            <div className="text-left mb-4 sm:mb-5">
              <label className="text-[12px] sm:text-[13px] text-[#5a3e1b] mb-1.5 sm:mb-2 block">
                Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                disabled={isLoading}
              />
            </div>

            <div className="text-left mb-5 sm:mb-6">
              <label className="text-[12px] sm:text-[13px] text-[#5a3e1b] mb-1.5 sm:mb-2 block">
                Mobile No
              </label>
              <Input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <button
              onClick={handleCreateAccount}
              disabled={isLoading}
              className="w-full py-[12px] sm:py-[13px] text-white text-[10px] sm:text-[11px] tracking-[0.2em] rounded-md mb-3 sm:mb-4 disabled:opacity-60"
              style={{ background: '#8b7355' }}
            >
              {isLoading ? 'PLEASE WAIT…' : 'CREATE ACCOUNT →'}
            </button>
          </>
        )}

        {/* ── STEP 2: OTP ── */}
        {step === STEP.OTP && (
          <>
            <p className="text-[12px] text-[#666] text-center mb-4">
              OTP sent to <span className="font-semibold text-[#3a2200]">{mobile}</span>
            </p>

            <div className="text-left mb-3">
              <label className="text-[12px] sm:text-[13px] text-[#5a3e1b] mb-1.5 sm:mb-2 block">
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

            <div className="text-right text-[11px] sm:text-[12px] text-[#777] mb-5">
              Didn't receive OTP?{' '}
              <span
                onClick={!isLoading ? handleResend : undefined}
                className={`text-[#c9973a] font-semibold ${isLoading ? 'opacity-50' : 'cursor-pointer'}`}
              >
                RESEND
              </span>
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={isLoading}
              className="w-full py-[12px] sm:py-[13px] text-white text-[10px] sm:text-[11px] tracking-[0.2em] rounded-md mb-3 sm:mb-4 disabled:opacity-60"
              style={{ background: '#8b7355' }}
            >
              {verifyingOtp ? 'VERIFYING…' : 'VERIFY & CONTINUE →'}
            </button>
          </>
        )}

        {/* ── STEP 3: SUCCESS ── */}
        {step === STEP.DONE && (
          <div className="text-center py-4">
            <p className="text-green-600 text-[15px] font-semibold mb-2">🎉 Welcome!</p>
            <p className="text-[13px] text-[#666]">Your account has been created successfully.</p>
          </div>
        )}

        {/* FOOTER */}
        {step !== STEP.DONE && (
          <p className="text-[12px] sm:text-[13px] text-[#777] text-center mt-1">
            Already have an account?{' '}
            <a href="/login" className="text-[#b8963a] font-semibold">
              Login
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
