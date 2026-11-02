export default function NewsletterSection() {
  return (
    <section className="bg-[#F8F5EC] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1280px] rounded-3xl bg-[#065F46] px-6 py-10 text-center text-white sm:px-10 sm:py-12">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Stay Connected
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
          Subscribe to our newsletter and receive updates about upcoming
          community events and volunteer opportunities.
        </p>

        <form className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="h-12 flex-1 rounded-full bg-white px-5 text-sm text-[#063E35] outline-none placeholder:text-[#7A9189] focus:ring-2 focus:ring-[#F97316]"
          />
          <button
            type="submit"
            className="h-12 rounded-full bg-[#F97316] px-7 text-sm font-bold text-white transition hover:bg-[#EA580C]"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
