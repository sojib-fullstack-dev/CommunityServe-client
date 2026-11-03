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
  userName?: string;
  userEmail?: string;
  userImage?: string;
  joiners?: Array<{
    userId?: string;
    userName?: string;
    userEmail?: string;
    userImage?: string;
  }>;
}

export default function JoinEventCard({ event }: { event: JointEvent }) {

const router = useRouter();

const formattedDate = (() => {
    const date = new Date(`${event.eventDate}T00:00:00`);
    return Number.isNaN(date.getTime())
        ? event.eventDate
        : date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
})();

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
    } catch {
        toast.error("Something went wrong!");
    }
}

const joinedUsers = event.joiners?.length
    ? event.joiners
    : [{
        userName: event.userName,
        userEmail: event.userEmail,
        userImage: event.userImage,
    }];


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
            <time dateTime={event.eventDate}>{formattedDate}</time>
          </div>
        </div>

        {joinedUsers.some((user) => user.userName || user.userEmail || user.userImage) && (
          <div className="mt-4 rounded-lg bg-[#F8F5EC] p-3">
            <p className="mb-3 text-xs font-bold text-[#687A75]">Joined by</p>
            <div className="space-y-3">
              {joinedUsers.map((user, index) => (
                <div
                  key={user.userId || user.userEmail || `${user.userName}-${index}`}
                  className="flex items-center gap-3"
                >
                  {user.userImage ? (
                    <Image
                      src={user.userImage}
                      alt={user.userName || "Joined user"}
                      width={44}
                      height={44}
                      unoptimized
                      className="size-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex size-11 items-center justify-center rounded-full bg-[#008C45] font-bold text-white">
                      {user.userName?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-bold text-[#063E35]">
                      {user.userName || user.userEmail || "User"}
                    </p>
                    {user.userEmail && (
                      <p className="truncate text-xs text-[#687A75]">{user.userEmail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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