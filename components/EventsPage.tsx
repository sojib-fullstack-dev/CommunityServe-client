

import EventCard from "@/components/Eventcard/EventCard";
import { IEvents } from "@/components/type/type";

const EventsPage = async () => {
  let events: IEvents[] = [];
  let fetchFailed = false;

  try {
    const res = await fetch("http://localhost:5000/upcoming-events", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to load events: ${res.status}`);
    }

    events = await res.json();
  } catch (error) {
    console.error(error);
    fetchFailed = true;
  }

  return (
    <section className="bg-[#F8F5EC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <header className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#F97316]">
            Make a difference
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#063E35] sm:text-4xl">
            Upcoming Events
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#687A75] sm:text-base">
            Find a community event near you and join others making a positive impact.
          </p>
        </header>

        {fetchFailed ? (
          <div className="rounded-2xl border border-[#E5ECE8] bg-white px-6 py-12 text-center shadow-sm">
            <p className="font-semibold text-[#063E35]">Events could not be loaded</p>
            <p className="mt-2 text-sm text-[#687A75]">
              Please check the API connection and try again.
            </p>
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-[#E5ECE8] bg-white px-6 py-12 text-center shadow-sm">
            <p className="font-semibold text-[#063E35]">No upcoming events yet</p>
            <p className="mt-2 text-sm text-[#687A75]">
              Check back soon for new community opportunities.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 6).map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsPage;