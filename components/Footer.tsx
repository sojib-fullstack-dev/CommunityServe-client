import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { label: "Upcoming Events", href: "/events" },
  { label: "Create Event", href: "/create-event" },
  { label: "Joined Event", href: "/join-event" },
  { label: "Manage Events", href: "/manage-event" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E2EAE6] bg-[#F7F9F7]">
      <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.75fr_1fr] lg:gap-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-2" aria-label="CommunityServe home">
              <Image
                src="/assets/logo.png"
                alt="CommunityServe"
                width={44}
                height={44}
                className="object-contain"
              />
              <span className="text-xl font-bold text-[#063E35]">
                Community<span className="text-[#008C45]">Serve</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[#687A75]">
              Connecting people, local organizations, and volunteers to create stronger and more caring communities.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#063E35]">Quick Links</h2>
            <nav className="mt-4 flex flex-col gap-3" aria-label="Footer navigation">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="w-fit text-sm text-[#687A75] transition-colors hover:text-[#008C45]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#063E35]">Get in Touch</h2>
            <div className="mt-4 space-y-3 text-sm text-[#687A75]">
              <a href="mailto:hello@communityserve.org" className="flex items-center gap-3 transition-colors hover:text-[#008C45]">
                <Mail className="size-4 shrink-0 text-[#008C45]" />
                <span>hello@communityserve.org</span>
              </a>
              <a href="tel:+8801700000000" className="flex items-center gap-3 transition-colors hover:text-[#008C45]">
                <Phone className="size-4 shrink-0 text-[#008C45]" />
                <span>+880 1700 000000</span>
              </a>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#008C45]" />
                <span>Dhaka, Bangladesh</span>
              </p>
            </div>

            <div className="mt-5 flex items-center gap-2" aria-label="Social media links">
              <a
                href="https://www.facebook.com/"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full border border-[#DCE6E1] bg-white text-[#526B64] transition hover:border-[#008C45] hover:text-[#008C45]"
              >
                <span className="text-base font-bold">f</span>
              </a>
              <a
                href="https://www.linkedin.com/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full border border-[#DCE6E1] bg-white text-[#526B64] transition hover:border-[#008C45] hover:text-[#008C45]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full border border-[#DCE6E1] bg-white text-[#526B64] transition hover:border-[#008C45] hover:text-[#008C45]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                  aria-hidden="true"
                >
                  <rect width="18" height="18" x="3" y="3" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#E2EAE6] pt-6 text-center text-sm text-[#7A9189] sm:flex-row sm:text-left">
          <span>© 2026 CommunityServe. All rights reserved.</span>
          <span>
            Built by{" "}
            <a
              href="https://sojib-fullstack-dev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#008C45] transition-colors hover:text-[#063E35]"
            >
              sojib-fullstack-dev
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
