import { HeroSection } from "@/components/homepage/HeroSection";
import { HomepageSection } from "@/components/homepage/HomepageSection";
import homepageContent from "../../../shared/content/homepage.json";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      {homepageContent.sections.map((section) => (
        <HomepageSection
          key={section.title}
          title={section.title}
          subtitle={section.subtitle}
          seriesIds={section.seriesIds}
        />
      ))}
    </div>
  );
}
