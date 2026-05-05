export default function SaleBannerSection() {
  return (
    <section className="w-full">
      <div className="w-full overflow-hidden">
        <img
          src="/sale.png"
          alt="Collection Banner"
          className="w-full h-auto object-cover block
            max-h-[220px] xs:max-h-[280px] sm:max-h-[380px] md:max-h-[480px] lg:max-h-[560px] xl:max-h-none"
        />
      </div>
    </section>
  );
}