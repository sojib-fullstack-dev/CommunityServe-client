import HeroSection from "@/components/HeroSection";

import GallerySection from "@/components/GallerySection";
import NewsletterSection from "@/components/NewsletterSection";
import EventsPage from "@/components/EventsPage";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <EventsPage />
      <GallerySection />
      <NewsletterSection />
    </div>
  );
}
