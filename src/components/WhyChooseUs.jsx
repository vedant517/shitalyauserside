import { useState } from "react";

const IMG = {
  centerFrame: "/framemiddle.png",
  pillarLeft: "/leftframee.png",
  pillarRight: "/rightframe.png",
  cardLeft: "/public/vector 3.png",
  cardRight: "/public/vector 3.png",
};

function Card({ bgImg, rotate = 0, title, body }) {
  return (
    <div
      className="relative w-full h-full"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <img
        src={bgImg}
        alt=""
        className="absolute inset-0 w-full h-full object-fill"
      />

      <div className="relative z-10 p-[10%] flex flex-col justify-between h-full">
        <p className="text-[clamp(10px,1vw,13px)] italic text-[#2e1a06] leading-relaxed">
          {body}
        </p>

        <p className="text-[clamp(8px,0.8vw,11px)] uppercase tracking-widest text-right text-[#6b3a10] font-semibold">
          {title}
        </p>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="w-full bg-white overflow-hidden ">
      
      {/* MAIN CONTAINER */}
      <div className="relative max-w-[1400px] mx-auto h-[420px] md:h-[520px]">

        {/* ───────── LEFT PILLAR ───────── */}
        <img
          src={IMG.pillarLeft}
          alt=""
          className="absolute left-0 bottom-0 h-full object-contain"
        />

        {/* ───────── RIGHT PILLAR ───────── */}
        <img
          src={IMG.pillarRight}
          alt=""
          className="absolute right-0 bottom-0 h-full object-contain"
        />

        {/* ───────── CENTER FRAME ───────── */}
        <div className="absolute inset-0 flex justify-center items-end">
          <img
            src={IMG.centerFrame}
            alt=""
            className="h-[80%] md:h-[90%] object-contain z-10"
          />
        </div>

        {/* ───────── TEXT INSIDE ARCH ───────── */}
        <div className="
  absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20
  top-[14%] sm:top-[18%] md:top-[20%]
  mt-[16px] sm:mt-[200px] md:mt-[150px]
">
  <p className="text-[clamp(12px,1.2vw,16px)] tracking-[0.2em] text-[#5a3010] font-semibold">
    WHY CHOOSE US ?
  </p>

  <div className="w-10 h-[1px] bg-[#c9973a]" />

  <button
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    className="px-5 sm:px-6 py-2 text-[10px] tracking-[0.2em] font-semibold transition-all"
    style={{
      background: "linear-gradient(135deg,#c9973a,#f0d080,#c9973a)",
      boxShadow: hovered
        ? "0 6px 20px rgba(201,151,58,0.6)"
        : "0 3px 10px rgba(201,151,58,0.4)",
    }}
  >
    SHOP NOW →
  </button>
</div>

       
        {/* ───────── LEFT CARD ───────── */}
{/* ───────── DESKTOP CARDS ONLY ───────── */}
<div className="hidden md:block">

  {/* LEFT CARD */}
  <div className="absolute left-[14%] top-[13%] w-[260px] h-[190px]">
    <Card
      bgImg={IMG.cardLeft}
      rotate={-8}
      title="Timeless Luxury Designs"
      body="Our collections blend tradition with modern elegance, creating sarees that never go out of style."
    />
  </div>

  {/* RIGHT CARD */}
  <div className="absolute right-[14%] top-[13%] w-[260px] h-[190px]">
    <Card
      bgImg={IMG.cardRight}
      rotate={8}
      title="Unmatched Craftsmanship"
      body="Every saree is a masterpiece crafted with precision and heritage techniques."
    />
  </div>

</div>
      </div>
    </section>
  );
}