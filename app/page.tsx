import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import EventsPage from "./events/page";

export default function Home() {
  return (
    <div >
      <Navbar />
      <HeroSection />
      <EventsPage/>
    </div>
  );
}
