'use client'
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface JointEvent {
  _id?: string;
  eventId: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
}

export default function JoinEventCard({ event }: { event: JointEvent }) {

const router = useRouter();

const handleCancel = async () => {
    try {
        const res = await fetch(`http://localhost:5000/join-event/${event._id}`, {
            method: 'DELETE', 
        });
        
        if (res.ok) {
            toast.success("Event cancelled!");
            router.refresh();
        } else {
            toast.error("Failed to cancel event");
        }
    } catch (error) {
        toast.error("Something went wrong!");
    }
}


  return (
    <article
      key={event._id || event.eventId}
      className="overflow-hidden rounded-xl border border-[#E5ECE8] bg-white shadow-[0_8px_30px_rgba(31,78,68,0.08)]"
    >
      <div className="relative h-52 bg-[#EDF3F0]">
        {event.thumbnail ? (
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="p-5">
        <p className="text-xs font-bold uppercase text-[#008C45]">
          {event.eventType}
        </p>
        <h2 className="mt-2 text-xl font-bold text-[#063E35]">
          {event.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#687A75]">
          {event.description}
        </p>

        <div className="mt-4 space-y-2 border-t border-[#EDF1EF] pt-4 text-sm text-[#526B64]">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-[#F97316]" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-[#F97316]" />
            <span>{event.eventDate}</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            href={`/events/${event.eventId}`}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#008C45] text-sm font-bold text-white"
          >
            View Details
            <ArrowRight className="ml-2 size-4" />
          </Link>
          <button
            onClick={handleCancel }
            type="button"
            className="flex h-11 cursor-pointer items-center justify-center rounded-lg border border-[#F1A7A7] text-sm font-bold text-[#B32626]"
          >
            <X className="mr-2 size-4" />
            Cancel Join
          </button>
        </div>
      </div>
    </article>
  );
}