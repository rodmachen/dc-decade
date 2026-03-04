import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative w-full h-48 md:h-64 bg-primary-dark overflow-hidden">
      <Image
        src="/banner.png"
        alt="The DC Decade"
        fill
        className="object-cover opacity-40"
        priority
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-text-inverse tracking-tight">
          The DC Decade
        </h1>
        <p className="mt-2 text-sm md:text-base text-text-inverse opacity-80">
          The 1980s — the decade that changed comics forever
        </p>
      </div>
    </section>
  );
}
