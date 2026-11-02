import HeroSection from "@/components/HeroSection";
import EventsPage from "./events/page";
import GallerySection from "@/components/GallerySection";
import NewsletterSection from "@/components/NewsletterSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <EventsPage limit={6} />
      <GallerySection />
      <NewsletterSection />
    </div>
  );
}
