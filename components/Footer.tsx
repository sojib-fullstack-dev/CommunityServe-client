import Image from "next/image";
import Link from "next/link";
import { Camera, Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { label: "Upcoming Events", href: "/events" },
  { label: "Create Event", href: "/create-event" },
  { label: "Join Event", href: "/join-event" },
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
                href="#"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full border border-[#DCE6E1] bg-white text-[#526B64] transition hover:border-[#008C45] hover:text-[#008C45]"
              >
                <span className="text-base font-bold">f</span>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-[#DCE6E1] bg-white text-[#526B64] transition hover:border-[#008C45] hover:text-[#008C45]"
              >
                <Camera className="size-4" />
              </a>
              <a
                href="#"
                aria-label="X"
                className="flex size-9 items-center justify-center rounded-full border border-[#DCE6E1] bg-white text-sm font-bold text-[#526B64] transition hover:border-[#008C45] hover:text-[#008C45]"
              >
                X
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#E2EAE6] pt-6 text-center text-sm text-[#7A9189] sm:text-left">
          © 2026 CommunityServe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

