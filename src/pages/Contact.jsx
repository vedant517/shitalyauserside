import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useCreateEnquiryMutation } from "../Redux/api/contactApi";

export default function Contact() {

  const [createEnquiry] = useCreateEnquiryMutation();

  const [form, setForm] = useState({
    name:      "",
    contactNo: "",
    email:     "",
    message:   "",
  });

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createEnquiry(form).unwrap();
      console.log("Success:", res);
      alert("Enquiry sent successfully!");
      setForm({ name: "", contactNo: "", email: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send enquiry");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white pt-[90px] px-3 sm:px-6 md:px-8 lg:px-10 pb-16 flex justify-center">

        <div className="relative w-full max-w-[1100px]">

          <img
            src="/half.png"
            alt=""
            className="
              hidden lg:block
              absolute left-1/2 -translate-x-1/2
              top-[-18px]
              w-full
              pointer-events-none z-[2]
            "
          />

          {/* MAIN CARD */}
          <div
            className="
              relative z-[1] bg-white
              rounded-2xl border border-[#d6b77a]
              shadow-[0_15px_60px_rgba(0,0,0,0.08)]
              grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[340px_1fr]
              overflow-hidden
            "
          >
            {/* LEFT PANEL */}
            <div className="flex flex-col justify-between bg-white border-b md:border-b-0 md:border-r border-[#e8dcc8]">

              <div className="p-5 sm:p-6 md:p-7 lg:p-8">
                <p className="text-[13px] sm:text-[14px] md:text-[15px] text-[#4a3520] leading-relaxed mb-6 md:mb-8 font-medium">
                  Connect with us for any inquiries,
                  assistance, or personalized styling support.
                </p>

                {/* Phone */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ede3d4] flex items-center justify-center">
                    📞
                  </div>
                  <span className="text-[13px] sm:text-[14px] md:text-[15px] text-[#3a2a18] font-medium">
                    +91 8585 454 454
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ede3d4] flex items-center justify-center">
                    ✉️
                  </div>
                  <span className="text-[13px] sm:text-[14px] md:text-[15px] text-[#3a2a18] font-medium break-all">
                    sheetalya@gmail.com
                  </span>
                </div>
              </div>

              <div className="relative h-[120px] sm:h-[160px] md:h-[200px]">
                <img
                  src="/elephanttree.png"
                  alt=""
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] sm:w-[260px] md:w-[300px] object-contain"
                />
              </div>
            </div>

            <div className="p-5 sm:p-6 md:p-8 lg:p-10">
              <form onSubmit={handleSubmit}>
                <h2
                  className="text-[26px] sm:text-[32px] md:text-[38px] lg:text-[44px] text-[#2c1c0c] mb-6 md:mb-8"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Contact Us
                </h2>

                {/* Name */}
                <div className="mb-4 sm:mb-5">
                  <label className="text-[12px] sm:text-sm text-[#6b4c2c] mb-2 block">
                    Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={set("name")}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#e0d0ba] rounded-lg bg-[#fefcf8] text-[14px] outline-none focus:border-[#c9973a]"
                  />
                </div>

                {/* Contact + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <input
                    type="tel"
                    value={form.contactNo}
                    onChange={set("contactNo")}
                    placeholder="Contact No"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#e0d0ba] rounded-lg bg-[#fefcf8] text-[14px] outline-none focus:border-[#c9973a]"
                  />
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="Email"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#e0d0ba] rounded-lg bg-[#fefcf8] text-[14px] outline-none focus:border-[#c9973a]"
                  />
                </div>

                {/* Message */}
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Write your message..."
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#e0d0ba] rounded-lg bg-[#fefcf8] text-[14px] mb-5 sm:mb-6 outline-none focus:border-[#c9973a] resize-none"
                />

                {/* Button */}
                <div className="flex justify-center md:justify-end">
                  <button
                    type="submit"
                    className="bg-[#8b7355] hover:bg-[#7a6347] transition-colors text-white px-6 sm:px-8 py-2.5 sm:py-3 text-[10px] sm:text-xs tracking-[0.2em] rounded-md"
                  >
                    SEND ENQUIRY →
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* END MAIN CARD */}

          <img
            src="/bottomhalf.png"
            alt=""
            className="
              hidden lg:block
              absolute left-1/2 -translate-x-1/2
              bottom-[-18px]
              w-full
              pointer-events-none z-[2]
            "
          />

        </div>
      </div>
    </>
  );
}