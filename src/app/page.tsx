import { HeroSection } from "@/components/HeroSection";
import { YouTubeSection } from "@/components/YouTubeSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CoursesSection } from "@/components/CoursesSection";
import { PackSection } from "@/components/PackSection";
import { Newsletter } from "@/components/Newsletter";
import { CTASection } from "@/components/CTASection";
import { MobiladorAI } from "@/components/MobiladorAI";

export default function Home() {
  return (
    <>
      <HeroSection />
      <YouTubeSection />
      <FeaturedProducts />
      <CoursesSection />
      <PackSection />
      <Newsletter />
      <CTASection />
      <MobiladorAI />
    </>
  );
}
