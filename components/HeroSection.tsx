import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";

const impactStats = [
  { value: "1,200+", label: "Kind People" },
  { value: "85+", label: "Events Organized" },
  { value: "40+", label: "Communities Reached" },
];

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#F8F5EC] text-[#065F46] mt-10">
      <div className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_12%_20%,rgba(249,115,22,0.08),transparent_24%)]" />

      <div className="mx-auto grid min-h-screen max-w-[1440px] items-center gap-12 px-6 py-12 sm:px-10 lg:grid-cols-[0.92fr_1.08fr] lg:px-16 lg:py-16 xl:px-20">
        <div className="relative z-10 max-w-[650px]">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#065F46]/10 bg-[#EAF3E7] px-4 py-2 text-sm font-semibold text-[#065F46] shadow-[0_8px_30px_rgba(6,95,70,0.06)]">
            <span aria-hidden="true">🌱</span>
            <span>Together We Make a Difference</span>
          </div>

          <h1 className="max-w-[620px] text-[clamp(3.25rem,7vw,6.75rem)] leading-[0.92] font-black tracking-[-0.065em] text-[#065F46]">
            <span className="block">Small Acts.</span>
            <span className="mt-2 block text-[#F97316]">Big Changes.</span>
          </h1>

          <p className="mt-7 max-w-[560px] text-lg leading-8 text-[#486B61] sm:text-xl sm:leading-9">
            Connect with local volunteers, join meaningful community events,
            and turn your kindness into real-world impact.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#events"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#065F46] px-7 text-base font-bold text-white shadow-[0_14px_34px_rgba(6,95,70,0.18)] transition-transform hover:-translate-y-0.5"
            >
              Explore Events
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#create-event"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border-2 border-[#F97316] bg-white px-7 text-base font-bold text-[#065F46] shadow-[0_10px_28px_rgba(249,115,22,0.08)] transition-transform hover:-translate-y-0.5"
            >
              Create an Event
              <Plus className="h-5 w-5 text-[#F97316]" />
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-1 divide-y divide-[#065F46]/12 border-y border-[#065F46]/12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {impactStats.map((stat, index) => (
              <div
                key={stat.label}
                className={`py-5 sm:py-4 ${
                  index === 0 ? "sm:pr-5" : index === 2 ? "sm:pl-5" : "sm:px-5"
                }`}
              >
                <dt className="text-xl font-black tracking-tight text-[#065F46] sm:text-2xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm font-medium text-[#6C8179]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[720px] lg:max-w-none">
          <div className="absolute -right-10 -top-7 h-36 w-36 rounded-full border-[18px] border-[#F97316]/10 sm:h-48 sm:w-48" />
          <div className="absolute -bottom-8 -left-10 h-44 w-44 rounded-full bg-[#DDE9D3]/70 blur-sm" />

          <svg
            className="absolute -left-5 top-1/4 z-20 h-20 w-20 text-[#F97316] opacity-80"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M50 84C49 61 51 35 72 13M50 64C38 59 27 50 21 38M54 52C68 48 77 41 85 30"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M22 38C31 34 38 37 42 43C34 47 26 45 22 38ZM69 14C79 16 84 23 82 31C73 29 67 23 69 14ZM84 31C91 34 94 40 91 47C84 44 80 39 84 31Z"
              fill="currentColor"
              fillOpacity=".18"
            />
          </svg>

          <div className="relative aspect-[4/4.15] overflow-hidden rounded-[3rem_3rem_7rem_3rem] bg-[#D7E3CF] shadow-[0_30px_80px_rgba(37,79,62,0.18)] sm:aspect-[5/4] lg:aspect-[4/4.45] xl:aspect-[5/4.15]">
            <Image
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=90"
              alt="Diverse young community volunteers working together in a lush garden"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#063D30]/25 via-transparent to-white/5" />

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/70 bg-white/95 px-5 py-4 shadow-[0_16px_40px_rgba(6,95,70,0.16)] backdrop-blur-md sm:bottom-7 sm:left-auto sm:right-7 sm:max-w-[310px]">
              <p className="text-center text-base font-bold tracking-tight text-[#065F46] sm:text-left sm:text-lg">
                Every Act of Kindness Matters{" "}
                <span aria-hidden="true" className="ml-1 text-lg">
                  💚
                </span>
              </p>
            </div>
          </div>

          <svg
            className="absolute -bottom-6 right-1 z-20 h-28 w-28 text-[#065F46]/30 sm:h-36 sm:w-36"
            viewBox="0 0 140 140"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M70 118C70 91 72 56 103 25M72 86C54 80 38 68 28 51M80 68C98 61 112 49 123 34"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M28 51C43 46 55 53 58 64C44 67 33 62 28 51ZM103 25C118 28 125 38 121 49C108 46 100 38 103 25Z"
              fill="currentColor"
              fillOpacity=".25"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}