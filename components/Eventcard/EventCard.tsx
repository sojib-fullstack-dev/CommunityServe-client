import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { IEvents } from "@/components/type/type";

const categoryStyles: Record<IEvents["eventType"], string> = {
  environment: "bg-[#E8F4EC] text-[#087443]",
  community: "bg-[#FFF0E3] text-[#B6530B]",
  education: "bg-[#EAF2FF] text-[#285A8E]",
  health: "bg-[#FCE9EC] text-[#A93D50]",
  food: "bg-[#FFF7D8] text-[#9A6810]",
  fundraising: "bg-[#F1EAFB] text-[#7350A4]",
};

function formatEventDate(value: string) {
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export const EventCard = ({ event }: { event: IEvents }) => {
  const categoryStyle =
    categoryStyles[event.eventType] ?? "bg-[#E8F4EC] text-[#087443]";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5ECE8] bg-white shadow-[0_8px_30px_rgba(31,78,68,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(31,78,68,0.14)] cursor-pointer">
      <div className="relative h-52 overflow-hidden bg-[#EDF3F0]">
        {event.thumbnail ? (
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#EDF3F0] text-sm font-medium text-[#7A9189]">
            CommunityServe Event
          </div>
        )}
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold capitalize shadow-sm ${categoryStyle}`}
        >
          {event.eventType}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-xl font-bold leading-snug text-[#063E35]">
          {event.title}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#687A75]">
          {event.description}
        </p>

        <div className="mt-5 space-y-2.5 border-t border-[#EDF1EF] pt-4 text-sm text-[#526B64]">
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 size-4 shrink-0 text-[#F97316]" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CalendarDays className="size-4 shrink-0 text-[#F97316]" />
            <time dateTime={event.eventDate}>
              {formatEventDate(event.eventDate)}
            </time>
          </div>
        </div>

        <Link
          href={`/events/${event._id}`}
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#008C45] text-sm font-semibold text-white shadow-sm transition hover:bg-[#00783B] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#008C45]/30"
        >
          View Details
        </Link>
      </div>
    </article>
  );
};

export default EventCard;