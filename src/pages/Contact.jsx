import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    message: "",
  });

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-3 sm:px-6 py-12 sm:py-16">

      {/* FRAME WRAPPER */}
      <div className="relative w-full max-w-[1000px] p-2">

        {/* MAIN CARD */}
        <div className="
          relative z-[1] bg-white
          rounded-2xl border border-[#d6b77a]
          shadow-[0_15px_60px_rgba(0,0,0,0.08)]
          grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr]
          overflow-hidden
        ">

          {/* LEFT PANEL */}
          <div className="flex flex-col justify-between bg-white border-b md:border-b-0 md:border-r border-[#e8dcc8]">

            <div className="p-5 sm:p-6 md:p-8">
              <p className="text-[13px] sm:text-[14px] md:text-[15px] text-[#4a3520] leading-relaxed mb-6 md:mb-8 font-medium">
                Connect with us for any inquiries,<br />
                assistance, or personalized styling support.
              </p>

              {/* Phone */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ede3d4] flex items-center justify-center flex-shrink-0">
                  📞
                </div>
                <span className="text-[13px] sm:text-[14px] md:text-[15px] text-[#3a2a18] font-medium">
                  +91 8585 454 454
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ede3d4] flex items-center justify-center flex-shrink-0">
                  ✉️
                </div>
                <span className="text-[13px] sm:text-[14px] md:text-[15px] text-[#3a2a18] font-medium break-all sm:break-normal">
                  sheetalya@gmail.com
                </span>
              </div>
            </div>

            {/* Bottom Image */}
            <div className="relative h-[100px] sm:h-[140px] md:h-[200px]">
              <img
                src="/elephanttree.png"
                alt=""
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[180px] sm:w-[240px] md:w-[320px] object-contain"
              />
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="p-5 sm:p-7 md:p-10">
            <form onSubmit={handleSubmit}>
              <h2 className="text-[24px] sm:text-[30px] md:text-[38px] lg:text-[44px] text-[#2c1c0c] mb-5 md:mb-8">
                Contact Us
              </h2>

              {/* Name */}
              <div className="mb-4 sm:mb-5">
                <label className="text-[12px] sm:text-sm text-[#6b4c2c] mb-1.5 sm:mb-2 block">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#e0d0ba] rounded-lg bg-[#fefcf8] text-[14px] outline-none focus:border-[#c9973a] transition"
                />
              </div>

              {/* Contact + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5">
                <input
                  type="tel"
                  value={form.contact}
                  onChange={set("contact")}
                  placeholder="Contact No"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#e0d0ba] rounded-lg bg-[#fefcf8] text-[14px] outline-none focus:border-[#c9973a] transition"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="Email"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#e0d0ba] rounded-lg bg-[#fefcf8] text-[14px] outline-none focus:border-[#c9973a] transition"
                />
              </div>

              {/* Message */}
              <textarea
                rows={4}
                value={form.message}
                onChange={set("message")}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#e0d0ba] rounded-lg bg-[#fefcf8] text-[14px] mb-4 sm:mb-6 outline-none focus:border-[#c9973a] transition resize-none"
                placeholder="Write your message..."
              />

              {/* Button */}
              <div className="flex justify-center md:justify-end">
                <button className="bg-[#8b7355] text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 text-[10px] sm:text-xs tracking-[0.2em] rounded-md whitespace-nowrap">
                  SEND ENQUIRY →
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* TOP ARCH */}
        <img
          src="/half.png"
          alt=""
          className="
            absolute left-1/2 -translate-x-1/2
            top-[-60px] sm:top-[-80px] md:top-[-104px]
            w-[85%] sm:w-[90%] md:w-full
            pointer-events-none z-[2]
          "
        />

        {/* BOTTOM ARCH */}
        <img
          src="/bottomhalf.png"
          alt=""
          className="
            absolute left-1/2 -translate-x-1/2
            bottom-[-60px] sm:bottom-[-80px] md:bottom-[8px]
            w-[85%] sm:w-[90%] md:w-full
            pointer-events-none z-[2]
          "
        />

      </div>
    </div>
  );
}