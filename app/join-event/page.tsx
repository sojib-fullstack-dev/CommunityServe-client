import Link from "next/link";
import { auth } from "@/lib/auth";
import JoinEventCard, { JointEvent } from "@/components/Eventcard/joinEventCard";
import { headers } from "next/headers";
import { connection } from "next/server";
import { Suspense } from "react";

async function JoinEventContent() {
  await connection();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userData = session?.user;

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#F8F5EC] px-4 pb-16 pt-28 text-center sm:px-6">
        <h1 className="text-3xl font-bold text-[#063E35]">My Joined Events</h1>
        <p className="mt-3 text-[#687A75]">Please login to see your joined events.</p>
        <Link
          href="/login"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[#008C45] px-6 font-bold text-white"
        >
          Login
        </Link>
      </div>
    );
  }

  let jointData: JointEvent[] = [];

  try {
    const response = await fetch(
      `http://localhost:5000/join-event/${encodeURIComponent(userData.email)}`,
      { cache: "no-store" },
    );

    if (response.ok) {
      const data = await response.json();
      jointData = Array.isArray(data) ? data : data ? [data] : [];
    }
  } catch (error) {
    console.error(error);
  }

  jointData = await Promise.all(
    jointData.map(async (event) => {
      try {
        const response = await fetch(
          `http://localhost:5000/join-event/event/${encodeURIComponent(event.eventId)}`,
          { cache: "no-store" },
        );

        if (!response.ok) return event;

        const joiners = await response.json();
        return {
          ...event,
          joiners: Array.isArray(joiners) ? joiners : [],
        };
      } catch (error) {
        console.error(error);
        return event;
      }
    }),
  );

  return (
    <main className="min-h-screen bg-[#F8F5EC] px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <header className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#F97316]">
            Welcome, {userData.name}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#063E35] sm:text-4xl">
            My Joined Events
          </h1>
        </header>

        {jointData.length === 0 ? (
          <div className="rounded-xl border border-[#E5ECE8] bg-white px-6 py-12 text-center">
            <p className="font-bold text-[#063E35]">No joined events yet</p>
            <Link href="/events" className="mt-4 inline-block font-bold text-[#008C45]">
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jointData.map((event) => (
              <JoinEventCard key={event._id || event.eventId} event={event} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function JoinEventPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-28  bg-[#F8F5EC]  text-center">Loading...</div>}>
      <JoinEventContent />
    </Suspense>
  );
}
