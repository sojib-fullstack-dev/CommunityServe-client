export const EventCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E5ECE8] bg-white shadow-[0_8px_30px_rgba(31,78,68,0.08)]">
      {/* Thumbnail Skeleton */}
      <div className="h-52 w-full animate-pulse bg-[#EDF3F0]"></div>
      
      <div className="p-5">

        {/* Description Skeleton */}
        <div className="mt-4 space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-[#EDF3F0]"></div>
          <div className="h-3 w-5/6 animate-pulse rounded bg-[#EDF3F0]"></div>
        </div>

        {/* Location & Date Skeleton */}
        <div className="mt-4 space-y-3 border-t border-[#EDF1EF] pt-4">
          <div className="flex items-center gap-2">
            <div className="size-4 animate-pulse rounded-full bg-[#EDF3F0]"></div>
            <div className="h-3 w-1/4 animate-pulse rounded bg-[#EDF3F0]"></div>
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="mt-5 h-11 w-full animate-pulse rounded-lg bg-[#EDF3F0]"></div>
      </div>
    </div>
  );
};