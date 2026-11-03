"use client";

import Image from "next/image";
import { CalendarDays, FileText, LockKeyhole, MapPin, Tag, AlignLeft, ImageIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function CreateEventPage() {
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

const { data: session } = authClient.useSession();
      const user= session?.user
      // console.log(user)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const fromData = new FormData(form);
    const formValues = Object.fromEntries(fromData.entries());

    if (!user) {
      toast.error("Please login to create an event!");
      return;
    }

  const { data:TokenData, error } = await authClient.token()
           const token=TokenData?.token

    if (typeof formValues.eventDate === "string" && formValues.eventDate < minDate) {
      toast.error("Past dates are not allowed. Please select today or a future date.");
      return;
    }
    
    const data = {
      ...formValues,
      email: user?.email,
      creatorName: user?.name,
      creatorImage: user?.image,
    };
              
    try {
      setIsSubmitting(true);
             
      const res = await fetch('http://localhost:5000/create-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        toast.success('Event created successfully!');
        form.reset();
        setDescriptionLength(0);

      } else {
        toast.error('Failed to create event. Please try again.');
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Something went wrong. Failed to connect to server.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#F8F5EC] px-2 pt-20 pb-10 sm:px-6 sm:py-28">
      <div className="mx-auto w-full max-w-[800px] rounded-[28px] border border-white/80 bg-white px-5 py-7 shadow-[0_18px_55px_rgba(31,78,68,0.10)] sm:px-9 sm:py-8">
        <header>
          <div className="flex items-center">
            <div className="mr-1 flex size-10 items-center justify-center rounded-full">
              <Image
                src="/assets/logo.png"
                alt=""
                width={34}
                height={34}
                className="size-8 object-contain"
              />
            </div>
            <span className="text-xl font-bold tracking-tight  text-green-700">
              Community<span className="text-orange-600">Serve</span>
            </span>
          </div>
          <h1 className="mt-5 text-[26px] font-bold tracking-tight text-[#063E35] sm:text-[30px]">
            Create Event
          </h1>
          <p className="mt-1 text-sm leading-6 text-[#6B7B77]">
            Fill in the details below to create a new community event.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <div>
            <label htmlFor="title" className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#244B44]">
              <FileText className="size-4 text-[#648078]" />
              Event Title <span className="text-[#F97316]">*</span>
            </label>
            <input
              id="title"
              name="title"
              required
              placeholder="e.g. Community Clean-Up Drive"
              className="h-12 w-full rounded-lg border border-[#DCE7E3] bg-[#FBFDFC] px-4 text-sm text-[#063E35] outline-none transition placeholder:text-[#9AA7A3] focus:border-[#0D9D95] focus:ring-3 focus:ring-[#0D9D95]/10"
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#244B44]">
              <AlignLeft className="size-4 text-[#648078]" />
              Description <span className="text-[#F97316]">*</span>
            </label>
            <div className="relative">
              <textarea
                id="description"
                name="description"
                required
                maxLength={500}
                placeholder="Provide details about the event, activities, what volunteers can expect, and any other important information."
                onChange={(event) => setDescriptionLength(event.target.value.length)}
                className="min-h-28 w-full resize-y rounded-lg border border-[#DCE7E3] bg-[#FBFDFC] px-4 py-3 pr-4 pb-7 text-sm leading-5 text-[#063E35] outline-none transition placeholder:text-[#9AA7A3] focus:border-[#0D9D95] focus:ring-3 focus:ring-[#0D9D95]/10"
              />
              <span className="absolute right-3 bottom-2 text-xs text-[#A3ADA9]">{descriptionLength}/500</span>
            </div>
          </div>

          <div>
            <label htmlFor="eventType" className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#244B44]">
              <Tag className="size-4 text-[#648078]" />
              Event Type <span className="text-[#F97316]">*</span>
            </label>
            <select
              id="eventType"
              name="eventType"
              required
              defaultValue=""
              className="h-12 w-full rounded-lg border border-[#DCE7E3] bg-[#FBFDFC] px-4 text-sm text-[#063E35] outline-none transition focus:border-[#0D9D95] focus:ring-3 focus:ring-[#0D9D95]/10"
            >
              <option value="" disabled>Select event type</option>
              <option value="environment">Environmental Cleanup</option>
              <option value="community">Community Service</option>
              <option value="education">Education & Training</option>
              <option value="health">Health & Wellness</option>
              <option value="food">Food Distribution</option>
              <option value="fundraising">Fundraising</option>
            </select>
          </div>

          <div>
            <label htmlFor="thumbnail" className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#244B44]">
              <ImageIcon className="size-4 text-[#648078]" />
              Thumbnail Image URL
            </label>
            <input
              id="thumbnail"
              name="thumbnail"
              type="url"
              placeholder="https://example.com/image.jpg"
              className="h-12 w-full rounded-lg border border-[#DCE7E3] bg-[#FBFDFC] px-4 text-sm text-[#063E35] outline-none transition placeholder:text-[#9AA7A3] focus:border-[#0D9D95] focus:ring-3 focus:ring-[#0D9D95]/10"
            />
            <p className="mt-2 flex items-center gap-1.5 text-xs text-[#7D8A86]">
              <ImageIcon className="size-3.5" />
              We’ll fetch and display the image from this URL.
            </p>
          </div>

          <div>
            <label htmlFor="location" className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#244B44]">
              <MapPin className="size-4 text-[#648078]" />
              Location <span className="text-[#F97316]">*</span>
            </label>
            <input
              id="location"
              name="location"
              required
              placeholder="e.g. Riverside Park, Austin, TX"
              className="h-12 w-full rounded-lg border border-[#DCE7E3] bg-[#FBFDFC] px-4 text-sm text-[#063E35] outline-none transition placeholder:text-[#9AA7A3] focus:border-[#0D9D95] focus:ring-3 focus:ring-[#0D9D95]/10"
            />
          </div>

          <div>
            <label htmlFor="eventDate" className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#244B44]">
              <CalendarDays className="size-4 text-[#648078]" />
              Event Date <span className="text-[#F97316]">*</span>
            </label>
            <input
              id="eventDate"
              name="eventDate"
              type="date"
              min={minDate}
              required
              className="h-12 w-full rounded-lg border border-[#DCE7E3] bg-[#FBFDFC] px-4 text-sm text-[#063E35] outline-none transition focus:border-[#0D9D95] focus:ring-3 focus:ring-[#0D9D95]/10"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 h-12 w-full rounded-lg bg-[#008C45] text-sm font-semibold text-white transition hover:bg-[#00783B] shadow-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit Event"}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-center text-xs text-[#74847F]">
            <LockKeyhole className="size-3.5 text-[#648078]" />
            Your event will be reviewed and published soon.
          </p>
        </form>
      </div>
    </section>
  );
}