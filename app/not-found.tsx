import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F5EC]">
            <h2 className="text-4xl font-bold text-[#063E35]">404</h2>
            <p className="mt-2 text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
            <Link 
                href="/" 
                className="mt-6 rounded-lg bg-[#008C45] px-6 py-2 text-white hover:bg-[#006B32]"
            >
                Return to Home
            </Link>
        </div>
    );
}