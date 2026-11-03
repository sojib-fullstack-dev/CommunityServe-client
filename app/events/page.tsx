import { IEvents } from "@/components/type/type";
import EventCard from "@/components/Eventcard/EventCard";
import { connection } from "next/server";
import { Suspense } from "react";
import { EventCardSkeleton } from "@/components/Eventcard/EventCardSkeleton";

async function EventsContent({ limit }: { limit?: number }) {
  await connection();

  let events: IEvents[] = [];
  let fetchFailed = false;

  try {
    const res = await fetch("http://localhost:5000/create-event", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to load events: ${res.status}`);
    }

    events = await res.json();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    events = events.filter((event) =>
      new Date(event.eventDate).getTime() >= today.getTime()
    );
    events.sort((a, b) =>
      new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
    );
  } catch (error) {
    console.error(error);
    fetchFailed = true;
  }

  if (fetchFailed) {
    return (
      <div className="rounded-2xl border border-[#E5ECE8] bg-white px-6 py-12 text-center shadow-sm">
        <p className="font-semibold text-[#063E35]">Events could not be loaded</p>
        <p className="mt-2 text-sm text-[#687A75]">
          Please check the API connection and try again.
        </p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-[#E5ECE8] bg-white px-6 py-12 text-center shadow-sm">
        <p className="font-semibold text-[#063E35]">No upcoming events yet</p>
        <p className="mt-2 text-sm text-[#687A75]">
          Check back soon for new community opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {(limit ? events.slice(0, limit) : events).map((item: IEvents) => (
        <EventCard key={item._id} event={item} />
      ))}
    </div>
  );
}

export default function EventsPage() {
  const limit = 12;
  return (
    <section className="min-h-screen bg-[#F8F5EC] px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8">
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

        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {Array.from({ length: limit ?? 12 }).map((_, index) => (
                <EventCardSkeleton key={index} />
              ))}
            </div>
          }
        >
          <EventsContent limit={limit} />
        </Suspense>
      </div>
    </section>
  );
}
