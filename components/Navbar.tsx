"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { LogIn, Moon, Sun, UserPlus } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { toast } from "sonner";

import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"


import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"

const navRoutes = [
    {
        name: "Create an Event",
        href: "/create-event",
    },
    {
        name: "Joined Events",
        href: "/join-event",
    },
     {
        name: "Manage Events",
        href: "/manage-event",
    },
       {
        name: "Profile",
        href: "/profile",
    }

];


const Navbar = () => {

    const { data: session, isPending } = authClient.useSession();
    const { resolvedTheme, setTheme } = useTheme();
    const user = session?.user;

    const handleSignOut = async () => {
        try {
            const { error } = await authClient.signOut();

            if (error) {
                throw new Error(error.message || "Sign out failed");
            }

            toast.success("Signed out successfully");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Sign out failed");
        }
    };


    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border/50 shadow-sm"
        >
            <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-10 lg:px-16 xl:px-20">
                <Link href="/" className="flex items-center gap-1" aria-label="CommunityServe home">
                    <Image
                        src="/assets/logo.png"
                        alt="CommunityServe logo"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                    <span className="text-xl font-bold tracking-tight text-green-700 dark:text-[#B7E4C7]">
                        Community<span className="text-orange-600 dark:text-[#FDBA74]">Serve</span>
                    </span>
                </Link>

                <div className="hidden items-center gap-8 lg:flex">
                    <Link href="/events" className="text-bold font-medium text-[#065F46] transition-colors hover:text-[#065F46] dark:text-[#E7F1ED] dark:hover:text-[#B7E4C7]">
                        Upcoming Events
                    </Link>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                        className="flex size-13 cursor-pointer items-center justify-center rounded-full text-[#065F46] transition-colors hover:bg-[#EAF3E7]"
                        aria-label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                        title={resolvedTheme === "dark" ? "Light theme" : "Dark theme"}
                        suppressHydrationWarning
                    >
                        <span suppressHydrationWarning>
                            {resolvedTheme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
                        </span>
                    </button>

                    {
                        isPending ? (
                            <div className="size-10 animate-pulse rounded-full bg-[#EDF3F0]" />
                        ) : user ? <>

                            <Popover>
                                <PopoverTrigger
                                    nativeButton={false}
                                    render={
                                        <Avatar className="cursor-pointer border-2 border-[#065F46]/20 transition hover:border-[#065F46]/50">
                                            <AvatarImage referrerPolicy="no-referrer" src={user?.image || ""} />
                                            <AvatarFallback className="bg-[#065F46] text-white font-bold">{user?.name?.charAt(0)}</AvatarFallback>
                                            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                                        </Avatar>
                                    }
                                />

                                <PopoverContent align="start" className="w-64 rounded-2xl border border-[#065F46]/10 bg-white p-4 shadow-[0_12px_40px_rgba(6,95,70,0.12)]">
                                    <PopoverHeader className="space-y-2">

                                        <PopoverTitle className="text-lg font-black text-[#065F46]">
                                            {user?.name}
                                        </PopoverTitle>

                                        <PopoverDescription className="flex flex-col gap-3 text-sm text-[#6C8179]">
                                            <span className="truncate">{user?.email}</span>

                                            <span>
                                                {navRoutes.map((route, index) => (
                                                    <Link
                                                        key={index}
                                                        href={route.href}
                                                        className="group block p-2 rounded-xl transition hover:bg-[#F8F5EC] text-left"
                                                    >
                                                        <span className="block text-sm font-bold text-[#065F46] group-hover:text-[#F97316] transition-colors">
                                                            {route.name}
                                                        </span>

                                                    </Link>
                                                ))}
                                            </span>


                                            <button
                                                onClick={handleSignOut}
                                                className="w-full rounded-xl bg-[#EA4335] h-10 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#D93025] hover:shadow-[0_4px_12px_rgba(234,67,53,0.2)] cursor-pointer"
                                            >
                                                Sign Out
                                            </button>
                                        </PopoverDescription>
                                    </PopoverHeader>
                                </PopoverContent>
                            </Popover>
                        </> : <>

                            <Link
                                href="/login"
                                className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-[#065F46] transition-colors hover:bg-[#EAF3E7] sm:inline-flex"
                            >
                                <LogIn className="size-4" />
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-[#065F46] transition-colors hover:bg-[#EAF3E7] sm:inline-flex"
                            >
                                <UserPlus className="size-4" />
                                Sign up
                            </Link>

                        </>
                    }
                    

                </div>
            </div>
        </nav>
    );
};
export default Navbar;