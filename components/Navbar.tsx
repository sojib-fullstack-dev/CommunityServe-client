"use client";

import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border/50 shadow-sm"
        >
            <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-16 xl:px-20">
                <Link href="/" className="flex items-center gap-1" aria-label="CommunityServe home">
                    <Image
                        src="/assets/logo.png"
                        alt="CommunityServe logo"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                    <span className="text-xl font-bold tracking-tight  text-green-700">
                        Community<span className="text-orange-600">Serve</span>
                    </span>
                </Link>

                <div className="hidden items-center gap-8 lg:flex">
                    <Link href="/events" className="text-bold font-medium text-[#065F46] transition-colors hover:text-[#065F46]">
                        Upcoming Events
                    </Link>
                    <Link href="/create-event" className="text-sm font-medium text-[#486B61] transition-colors hover:text-[#065F46]">
                        Create an Event
                    </Link>
                    {/* <Link href="/#community" className="text-sm font-medium text-[#486B61] transition-colors hover:text-[#065F46]">
                        Community
                    </Link> */}
                </div>

                <div className="flex items-center gap-1">
                    <Link
                        href="/login"
                        className="hidden rounded-full px-4 py-2 text-sm font-bold text-[#065F46] transition-colors hover:bg-[#EAF3E7] sm:inline-flex"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                     className="hidden rounded-full px-4 py-2 text-sm font-bold text-[#065F46] transition-colors hover:bg-[#EAF3E7] sm:inline-flex"
                    >
                        Sign up
                    </Link>
                    <Link href='/profile' className="hidden rounded-full px-4 py-2 text-sm font-bold text-[#065F46] transition-colors hover:bg-[#EAF3E7] sm:inline-flex">
                      Profile
                    </Link>
                    
                </div>
            </div>
        </nav>
    );
};
export default Navbar;