import { HeroSection } from "@/components/HeroSection";
import { YouTubeSection } from "@/components/YouTubeSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CoursesSection } from "@/components/CoursesSection";
import { PackSection } from "@/components/PackSection";
import { CalculatorPreview } from "@/components/CalculatorPreview";
import { BlogPreview } from "@/components/BlogPreview";
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
      <CalculatorPreview />
      <BlogPreview />
      <Newsletter />
      <CTASection />
      <MobiladorAI />
    </>
  );
}
