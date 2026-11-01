"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/profile");
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#F8F5EC] px-6 pt-24 pb-12">
      <div className="w-full max-w-md rounded-[2rem] border border-[#065F46]/10 bg-white p-7 shadow-[0_24px_70px_rgba(6,95,70,0.12)] sm:p-10">
        <div className="mb-7">
          <p className="mb-3 text-sm font-bold text-[#F97316]">Join the community</p>
          <h1 className="text-4xl font-black tracking-tight text-[#065F46]">Create account</h1>
          <p className="mt-3 text-[#6C8179]">Start volunteering, connecting, and creating impact.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-bold text-[#065F46]">
            Full name
            <Input required name="name" placeholder="Alex Morgan" className="mt-2 h-12 rounded-xl border-[#065F46]/15 px-4 text-base text-[#065F46]" />
          </label>
          <label className="block text-sm font-bold text-[#065F46]">
            Email address
            <Input required type="email" name="email" placeholder="you@example.com" className="mt-2 h-12 rounded-xl border-[#065F46]/15 px-4 text-base text-[#065F46]" />
          </label>
          <label className="block text-sm font-bold text-[#065F46]">
            Password
            <Input required type="password" name="password" minLength={8} placeholder="At least 8 characters" className="mt-2 h-12 rounded-xl border-[#065F46]/15 px-4 text-base text-[#065F46]" />
          </label>

          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#065F46] font-bold text-white shadow-[0_12px_30px_rgba(6,95,70,0.16)]">
            Sign up
            <ArrowRight className="size-5" />
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-[#6C8179]">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#F97316] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
