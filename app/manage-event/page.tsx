import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import EventEdit from "@/components/Eventcard/EventEdit";
import Eventdelete from "@/components/Eventcard/Eventdelete";
import { IEvents } from "@/components/type/type";
import { CalendarDays, MapPin } from "lucide-react";

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

async function ManageEvent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;

  if (!email) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center">
        <p className="font-semibold">Please log in to manage your events.</p>
        <Link href="/login" className="mt-4 inline-block text-[#008C45] underline">
          Go to login
        </Link>
      </div>
    );
  }

  let events: IEvents[] = [];

  try {
    const res = await fetch(
      `http://localhost:5000/manage-event/${encodeURIComponent(email)}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to load events");
    }

    const data = await res.json();
    events = Array.isArray(data) ? data : data ? [data] : [];
  } catch (error) {
    console.error(error);
    return (
      <div className="rounded-lg border bg-white p-8 text-center">
        <p className="font-semibold">Events could not be loaded.</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center">
        <p className="font-semibold">You have not created any events.</p>
        <Link href="/create-event" className="mt-4 inline-block text-[#008C45] underline">
          Create an event
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <article
          key={event._id}
          className="group overflow-hidden rounded-2xl border border-[#E5ECE8] bg-white shadow-[0_8px_30px_rgba(31,78,68,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(31,78,68,0.14)]"
        >
          <div className="relative h-52 overflow-hidden bg-[#EDF3F0]">
            {event.thumbnail ? (
              <Image
                src={event.thumbnail}
                alt={event.title}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm font-medium text-[#7A9189]">
                CommunityServe Event
              </div>
            )}
            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold capitalize text-[#008C45] shadow-sm">
              {event.eventType}
            </span>
          </div>

          <div className="flex flex-col p-5">
            <Link href={`/events/${event._id}`}>
              <h2 className="text-xl font-bold leading-snug text-[#063E35] transition hover:text-[#008C45]">
                {event.title}
              </h2>
            </Link>
            <p className="mt-2 line-clamp-3 min-h-18 text-sm leading-6 text-[#687A75]">
              {event.description}
            </p>

            <div className="mt-4 space-y-2.5 border-t border-[#EDF1EF] pt-4 text-sm text-[#526B64]">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#F97316]" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CalendarDays className="size-4 shrink-0 text-[#F97316]" />
                <time dateTime={event.eventDate}>{formatDate(event.eventDate)}</time>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <EventEdit event={event} />
              <Eventdelete event={event} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function ManageEventPage() {
  return (
    <main className="min-h-screen bg-[#F8F5EC] px-4 pb-16 pt-28 sm:px-6">
      <div className="mx-auto max-w-[1280px]">
        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#F97316]">
              Your dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[#063E35] sm:text-4xl">
              Manage Events
            </h1>
            <p className="mt-2 text-sm text-[#687A75]">
              View and manage all events created by your account.
            </p>
          </div>
          <Link
            href="/create-event"
            className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#008C45] px-5 text-sm font-bold text-white transition hover:bg-[#00783B] sm:w-auto"
          >
            Create New Event
          </Link>
        </header>
        <Suspense
          fallback={
            <div className="rounded-2xl border border-[#E5ECE8] bg-white p-10 text-center text-[#687A75]">
              Loading your events...
            </div>
          }
        >
          <ManageEvent />
        </Suspense>
      </div>
    </main>
  );
}
