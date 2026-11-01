"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/profile");
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#F8F5EC] px-6 pt-24 pb-12">
      <div className="w-full max-w-md rounded-[2rem] border border-[#065F46]/10 bg-white p-7 shadow-[0_24px_70px_rgba(6,95,70,0.12)] sm:p-10">
        <div className="mb-8">
          <p className="mb-3 text-sm font-bold text-[#F97316]">Welcome back</p>
          <h1 className="text-4xl font-black tracking-tight text-[#065F46]">Log in</h1>
          <p className="mt-3 text-[#6C8179]">Continue making a difference in your community.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block text-sm font-bold text-[#065F46]">
            Email address
            <Input
              required
              type="email"
              name="email"
              placeholder="you@example.com"
              className="mt-2 h-12 rounded-xl border-[#065F46]/15 px-4 text-base text-[#065F46]"
            />
          </label>

          <label className="block text-sm font-bold text-[#065F46]">
            Password
            <span className="relative mt-2 block">
              <Input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="h-12 rounded-xl border-[#065F46]/15 px-4 pr-12 text-base text-[#065F46]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6C8179]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </span>
          </label>

          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#065F46] font-bold text-white shadow-[0_12px_30px_rgba(6,95,70,0.16)]">
            Log in
            <ArrowRight className="size-5" />
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-[#6C8179]">
          New to CommunityServe?{" "}
          <Link href="/signup" className="font-bold text-[#F97316] hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
