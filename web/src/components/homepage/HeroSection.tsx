import Image from "next/image";

export function HeroSection() {
  return (
    <section className="w-full bg-primary-dark">
      <div className="relative w-full max-w-3xl mx-auto aspect-[16/4] px-4">
        <Image
          src="/banner.png"
          alt="The DC Decade"
          fill
          className="object-contain"
          priority
        />
      </div>
      <p className="pb-3 text-sm md:text-base text-text-inverse opacity-90 text-center">
        The 1980s — the decade that changed comics forever
      </p>
    </section>
  );
}
