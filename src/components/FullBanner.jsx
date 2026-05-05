export default function FullBannerSection() {
  return (
    <section className="w-full">
      <div className="w-full">

        {/* Image Container */}
        <div className="w-full overflow-hidden shadow-lg">
          <img
            src="public/fullbanner.png"
            alt="Collection Banner"
            className="w-full h-[160px] xs:h-[200px] sm:h-[280px] md:h-[380px] lg:h-[480px] xl:h-[560px] 2xl:h-[640px] object-cover object-center"
          />
        </div>

      </div>
    </section>
  );
}