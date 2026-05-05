export default function SaleBannerSection() {
  return (
    <section className="w-full relative overflow-hidden min-h-[260px] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[500px] xl:min-h-[560px] bg-[#2e1205]"
      style={{ background: "linear-gradient(135deg,#2e1205 0%,#4a1c06 25%,#6b2d0e 50%,#5a2308 75%,#2e1205 100%)" }}
    >

      {/* Damask textile texture */}
      <div className="absolute inset-0 pointer-events-none opacity-100"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.065'%3E%3Cpath d='M50 0 C38 12,12 12,0 25 C12 38,12 62,0 75 C12 88,38 88,50 100 C62 88,88 88,100 75 C88 62,88 38,100 25 C88 12,62 12,50 0Z'/%3E%3Ccircle cx='50' cy='50' r='10'/%3E%3Ccircle cx='0' cy='0' r='6'/%3E%3Ccircle cx='100' cy='0' r='6'/%3E%3Ccircle cx='0' cy='100' r='6'/%3E%3Ccircle cx='100' cy='100' r='6'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Right warm radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 75% at 68% 50%, rgba(160,70,10,0.38) 0%, transparent 70%)" }}
      />

      {/* Left vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(20,6,0,0.5) 0%, transparent 35%)" }}
      />

      {/* Gold border top */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px]"
        style={{ background: "linear-gradient(90deg,transparent 0%,#a07828 15%,#f0d080 40%,#f5e090 50%,#f0d080 60%,#a07828 85%,transparent 100%)" }}
      />
      {/* Gold border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2.5px]"
        style={{ background: "linear-gradient(90deg,transparent 0%,#a07828 15%,#f0d080 40%,#f5e090 50%,#f0d080 60%,#a07828 85%,transparent 100%)" }}
      />

      {/* Main layout */}
      <div className="relative flex flex-row items-center w-full h-full
          min-h-[260px] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[500px] xl:min-h-[560px]
          px-4 sm:px-8 md:px-14 lg:px-20 xl:px-24
          py-6 sm:py-8 md:py-10 lg:py-12
          gap-3 sm:gap-5 md:gap-8 lg:gap-10"
      >

        {/* ── LEFT TEXT BLOCK ── */}
        <div className="flex-shrink-0 flex flex-col z-10
            gap-[2px] sm:gap-1 md:gap-[6px] lg:gap-2
            max-w-[140px] sm:max-w-[200px] md:max-w-[260px] lg:max-w-[310px] xl:max-w-[340px]"
        >
          {/* TRADITIONAL — semibold, smaller */}
          <p className="uppercase tracking-[0.22em] leading-[1.15]
              text-[11px] sm:text-[13px] md:text-[16px] lg:text-[20px] xl:text-[26px]
              font-semibold"
            style={{
              fontFamily: "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif",
              color: "#dbb86a",
              textShadow: "0 1px 10px rgba(180,120,0,0.3)",
            }}
          >
            Traditional
          </p>

          {/* SILK SAREE — extrabold, larger */}
          <p className="uppercase leading-none tracking-[0.04em]
              text-[20px] sm:text-[28px] md:text-[36px] lg:text-[46px] xl:text-[56px]
              font-extrabold"
            style={{
              fontFamily: "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif",
              color: "#f5d97a",
              textShadow: "0 2px 20px rgba(180,120,0,0.55), 0 1px 0 #7a4e00",
            }}
          >
            Silk Saree
          </p>

          {/* Gold divider */}
          <div className="h-[1.5px] my-1 sm:my-1.5 md:my-2
              w-8 sm:w-10 md:w-14 lg:w-16"
            style={{ background: "linear-gradient(90deg,#c9a84c,#f0d080 60%,transparent)" }}
          />

          {/* END OF THE SEASON */}
          <p className="uppercase tracking-[0.28em] leading-[1.3]
              text-[7px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[13px]
              font-normal"
            style={{
              fontFamily: "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif",
              color: "#c9a84c",
            }}
          >
            End of the Season
          </p>

          {/* SALE */}
          <p className="uppercase tracking-[0.08em] leading-none
              text-[20px] sm:text-[26px] md:text-[34px] lg:text-[44px] xl:text-[52px]
              font-bold"
            style={{
              fontFamily: "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif",
              color: "#f5d97a",
              textShadow: "0 2px 18px rgba(180,120,0,0.5), 0 1px 0 #7a4e00",
            }}
          >
            Sale
          </p>

          {/* 20% */}
          <p className="leading-none font-extrabold
              text-[26px] sm:text-[36px] md:text-[48px] lg:text-[62px] xl:text-[74px]
              mt-0.5"
            style={{
              fontFamily: "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif",
              color: "#ffffff",
              textShadow: "0 0 30px rgba(245,217,122,0.65), 0 2px 0 #5a2308",
            }}
          >
            20%
          </p>

          {/* OFF */}
          <p className="uppercase tracking-[0.12em] leading-none font-extrabold
              text-[18px] sm:text-[26px] md:text-[34px] lg:text-[42px] xl:text-[50px]
              -mt-1 sm:-mt-1.5 md:-mt-2"
            style={{
              fontFamily: "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif",
              color: "#ffffff",
              textShadow: "0 0 22px rgba(245,217,122,0.4), 0 2px 0 #5a2308",
            }}
          >
            Off
          </p>

          {/* SHOP NOW */}
          <div className="mt-2 sm:mt-3 md:mt-4">
            <button className="group flex items-center gap-1.5 bg-transparent border-0 p-0 cursor-pointer">
              <span className="uppercase tracking-[0.38em] font-bold
                  text-[8px] sm:text-[9px] md:text-[10px] lg:text-[12px]"
                style={{
                  fontFamily: "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif",
                  color: "#f5d97a",
                  textShadow: "0 1px 8px rgba(180,120,0,0.5)",
                }}
              >
                Shop Now
              </span>
              <span className="text-[12px] sm:text-[14px] transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: "#f5d97a" }}
              >
                ›
              </span>
            </button>
            <div className="h-px mt-0.5 w-10 sm:w-12 md:w-16"
              style={{ background: "linear-gradient(90deg,#c9a84c,transparent)" }}
            />
          </div>
        </div>

        {/* ── ARCH CARDS ── */}
        <div className="flex flex-row flex-1 items-end justify-center z-10
            gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5
            overflow-visible"
        >
          <ArchCard slot={1} />
          <ArchCard slot={2} hero />
          <div className="overflow-hidden" style={{ maxWidth: "calc(33.33% + 14px)" }}>
            <ArchCard slot={3} />
          </div>
        </div>

      </div>
    </section>
  );
}

/* ── Arch Card ── */
function ArchCard({ slot, hero = false }) {
  return (
    <div
      className={[
        "relative flex-shrink-0",
        hero
          ? "w-[100px] sm:w-[140px] md:w-[176px] lg:w-[210px] xl:w-[238px] h-[152px] sm:h-[210px] md:h-[272px] lg:h-[350px] xl:h-[430px] -translate-y-1 sm:-translate-y-2"
          : "w-[88px] sm:w-[122px] md:w-[154px] lg:w-[184px] xl:w-[208px] h-[136px] sm:h-[188px] md:h-[240px] lg:h-[306px] xl:h-[380px]",
      ].join(" ")}
      style={{
        borderRadius: "9999px 9999px 20px 20px",
        background: "linear-gradient(160deg,#9e4418 0%,#6b2a0a 40%,#4a1c06 80%,#2e1205 100%)",
        boxShadow: [
          "0 30px 44px -8px rgba(0,0,0,0.78)",
          "7px 0 0 0 rgba(70,24,4,0.92)",
          "9px 5px 8px 0 rgba(0,0,0,0.52)",
          "0 0 0 1.5px rgba(201,168,76,0.55)",
          "0 0 22px 3px rgba(201,168,76,0.15)",
          "inset 0 3px 12px rgba(245,217,122,0.16)",
          "inset 0 -10px 24px rgba(0,0,0,0.48)",
        ].join(", "),
        transform: hero
          ? "perspective(700px) rotateY(-2.5deg) translateY(-8px)"
          : "perspective(700px) rotateY(-2.5deg)",
        transformOrigin: "center bottom",
      }}
    >
      {/* Top arch concave glow */}
      <div className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          borderRadius: "inherit",
          background: "radial-gradient(ellipse 80% 50% at 50% 0%,rgba(245,217,122,0.13) 0%,transparent 65%)",
        }}
      />

      {/* Left edge highlight */}
      <div className="absolute top-0 left-0 bottom-0 w-[10px] pointer-events-none z-[3]"
        style={{
          borderRadius: "9999px 0 0 20px",
          background: "linear-gradient(90deg,rgba(245,217,122,0.22) 0%,transparent 100%)",
        }}
      />

      {/* Right edge deep shadow */}
      <div className="absolute top-0 right-0 bottom-0 w-[12px] pointer-events-none z-[3]"
        style={{
          borderRadius: "0 9999px 20px 0",
          background: "linear-gradient(270deg,rgba(0,0,0,0.5) 0%,transparent 100%)",
        }}
      />

     {/* IMAGE LAYER */}
<div
  className="absolute inset-0 overflow-hidden z-[1]"
  style={{ borderRadius: "inherit" }}
>
  <img
    src={`/model-${slot}.png`}   // your images here
    alt={`Saree model ${slot}`}
    className="w-full h-full object-cover object-top"
  />

  {/* optional soft dark overlay for better blending */}
  <div
    className="absolute inset-0"
    style={{
      background:
        "linear-gradient(180deg, transparent 40%, rgba(20,6,0,0.6) 100%)",
    }}
  />
</div>
      <div className="absolute inset-0 flex items-center justify-center z-[1]"
        style={{ borderRadius: "inherit" }}
      >
        <span className="text-center px-2 leading-[1.4] opacity-30
            text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px]"
          style={{ color: "#f5d97a", fontFamily: "serif" }}
        >
          Model Image {slot}
        </span>
      </div>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-[38%] pointer-events-none z-[4]"
        style={{
          background: "linear-gradient(0deg,rgba(28,7,0,0.85) 0%,transparent 100%)",
          borderRadius: "0 0 20px 20px",
        }}
      />

      {/* Gold border overlay */}
      <div className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          borderRadius: "inherit",
          border: "1.5px solid rgba(201,168,76,0.5)",
        }}
      />

      {/* Inner arch rim highlight */}
      <div className="absolute top-[2px] left-[2px] right-[2px] h-[48%] pointer-events-none z-[5]"
        style={{
          borderRadius: "9999px 9999px 0 0",
          border: "1px solid rgba(245,225,120,0.25)",
          borderBottom: "none",
        }}
      />

      {/* Candle-light base glow */}
      <div className="absolute bottom-0 left-[8%] right-[8%] pointer-events-none z-[4]
          h-[14px] sm:h-[18px] md:h-[22px] lg:h-[26px] xl:h-[30px]"
        style={{
          background: "radial-gradient(ellipse 80% 100% at 50% 100%,rgba(220,140,30,0.35) 0%,transparent 100%)",
        }}
      />
    </div>
  );
}