import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { IEvents } from "@/components/type/type";
import { Suspense } from "react";
import JoinButton from "@/components/Eventcard/JoinButton";
import { notFound } from "next/navigation";

export default function EventDetailsPage({ params }: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<p className="pt-28 text-center">Loading event...</p>}>
      <EventData params={params} />
    </Suspense>
  );
}

async function EventData({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/create-event/${id}`, {
    headers:{
       authorization: 'user login'
    },
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const event: IEvents | null = await res.json().catch(() => null);
  if (!event) {
    notFound();
  }
console.log(event)

  const date = new Date(`${event.eventDate}T00:00:00`);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
 

  return (
    <main className="min-h-screen bg-[#F8F5EC] px-4 pb-16 pt-28 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link href="/events" className="inline-flex items-center gap-2 text-sm font-bold text-[#008C45]">
          <ArrowLeft className="size-4" />
          Back to events
        </Link>
        <article className=" overflow-hidden rounded-lg border border-[#E5ECE8] bg-white shadow-[0_8px_30px_rgba(31,78,68,0.08)]">
          {event.thumbnail && (
            <Image
              src={event.thumbnail}
              alt={event.title}
              width={1200}
              height={600}
              className="h-72 w-full object-cover sm:h-96"
            />
          )}

          <div className="p-6 sm:p-8">


            <p className="mt-6 text-sm font-bold capitalize text-[#008C45]">
              {event.eventType}
            </p>

            <div className="mt-2 flex items-start justify-between gap-4">
              <h1 className="text-3xl font-bold text-[#063E35] sm:text-4xl">
                {event.title}
              </h1>

            </div>

            <div className="mt-5 flex flex-col gap-3 border-y border-[#EDF1EF] py-5 text-sm text-[#526B64] sm:flex-row sm:gap-8">
              <div className="flex items-center gap-2.5">
                <MapPin className="size-4 text-[#F97316]" />
                <span>{event.location}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <CalendarDays className="size-4 text-[#F97316]" />
                <time dateTime={event.eventDate}>{formattedDate}</time>
              </div>
            </div>

            {event.email && (
              <div className="mt-4 flex items-center gap-3 text-sm text-[#526B64]">
                {event.creatorImage ? (
                  <Image
                    src={event.creatorImage}
                    alt={event.creatorName || "Event creator"}
                    width={44}
                    height={44}
                    unoptimized
                    className="size-11 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-11 items-center justify-center rounded-full bg-[#008C45] font-bold text-white">
                    {event.creatorName?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div>
                  <p className="text-xs text-[#687A75]">Created by</p>
                  <a
                    href={`mailto:${event.email}`}
                    className="font-semibold text-[#008C45] hover:underline"
                  >
                    {event.creatorName || event.email}
                  </a>
                  {event.creatorName && (
                    <p className="text-xs text-[#687A75]">{event.email}</p>
                  )}
                </div>
              </div>
            )}

            <div className='flex justify-between items-center'>
              <p className="mt-6 leading-7 text-[#687A75]">
                {event.description}
              </p>
              <JoinButton event={event} />
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}