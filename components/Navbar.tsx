import Image from "next/image";
import { Sun } from "lucide-react";

const Navbar = () => {
    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border/50 shadow-sm"
        >
            <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6">
                <div className="flex items-center gap-1">
                    <Image
                        src="/assect/logo.png"
                        alt="CommunityServe logo"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                    <span className="text-xl font-bold tracking-tight  text-green-700">
                        Community<span className="text-orange-600">Serve</span>
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <a href="#upcoming-events" className="text-sm font-medium Itext-foreground hover:text-primary transition-colors">
                        Upcoming Events
                    </a>
                    <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                        About
                    </a>
                    <a href="#community" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                        Community
                    </a>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        className="px-4 py-2 text-sm font-medium bg-teal-600/10 text-teal-600 hover:bg-teal-600/20 rounded-full transition-color"
                    >
                        Login
                    </button>
                    <button
                        id="theme-toggle"
                        className="p-2 rounded-full hover:bg-primary/5 transition-color"
                        aria-label="Toggle theme"
                    >
                        <Sun className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;