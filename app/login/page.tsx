"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.8 3-4.4 3-7.4Z" />
      <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1a5.9 5.9 0 0 1-5.5-4.1H3.2v2.6A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.5 14a6 6 0 0 1 0-3.8V7.5H3.2A10 10 0 0 0 2 12c0 1.6.4 3.1 1.2 4.5l3.3-2.5Z" />
      <path fill="#EA4335" d="M12 6a5.4 5.4 0 0 1 3.8 1.5l2.9-2.9A9.7 9.7 0 0 0 12 2a10 10 0 0 0-8.8 5.5l3.3 2.7A5.9 5.9 0 0 1 12 6Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.944 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.58 9.58 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10Z" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
          
    // Email and password log in
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {  email: string, password: string }
    console.log(user)

    // router.push("/");
    const { data, error } = await authClient.signIn.email({
      ...user
    })
    if (data) {
      router.push("/");
      toast.success('Log In Successful', {
        style: {
          backgroundColor: '#ECFDF5',
          color: '#065F46',
          border: '1px solid #A7F3D0'
        }
      })
    }
    if (error) {
      console.log(error);
      toast.error(error.message || 'Log In Failed', {
        style: {
          backgroundColor: '#FEF2F2',
          color: '#DC2626',
          border: '1px solid #FCA5A5'
        }
      });
    }

  }

  //  Google  sign up
  const handleGoogleSignUp = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      errorCallbackURL: "/signup",
    });
    if (data) {
   
      toast.success('Sign Up with Google Successful', {
        style: {
          backgroundColor: '#ECFDF5',
          color: '#065F46',
          border: '1px solid #A7F3D0'
        }
      });
    }

    if (error) {
      console.error(error);
      toast.error(error.message || 'Google Sign Up Failed', {
        style: {
          backgroundColor: '#FEF2F2',
          color: '#DC2626',
          border: '1px solid #FCA5A5'
        }
      });
    }
  }
  // GitHub sign up
  const handleGitHubSignUp = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
      errorCallbackURL: "/signup",
    })

    if (data) {
      toast.success('Sign Up with GitHub Successful', {
        style: {
          backgroundColor: '#ECFDF5',
          color: '#065F46',
          border: '1px solid #A7F3D0'
        }
      });
    }

    if (error) {
      console.error(error);
      toast.error(error.message || 'GitHub Sign Up Failed', {
        style: {
          backgroundColor: '#FEF2F2',
          color: '#DC2626',
          border: '1px solid #FCA5A5'
        }
      });
    }
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
                minLength={6}
                pattern="(?=.*[A-Z])(?=.*[a-z]).{6,}"
                title="Password must contain 6 characters, including 1 uppercase and 1 lowercase letter"
                placeholder="Enter your password"
                className="h-12 rounded-xl border-[#065F46]/15 px-4 pr-12 text-base text-[#065F46]"
              /> <p className="mt-2 text-xs font-normal text-[#6C8179]">
              Use 6+ characters with at least 1 uppercase and 1 lowercase letter.
            </p>
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

          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#065F46] font-bold cursor-pointer text-white shadow-[0_12px_30px_rgba(6,95,70,0.16)] ">
            Log in
            <ArrowRight className="size-5 " />
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#065F46]/10" />
          <span className="text-xs font-semibold text-[#6C8179]">or continue with</span>
          <div className="h-px flex-1 bg-[#065F46]/10" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleGoogleSignUp}
            type="button"
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#065F46]/15 bg-white text-sm font-bold text-[#065F46] transition hover:border-[#065F46]/30 hover:bg-[#F8F5EC]"
            aria-label="Continue with Google"
          >
            <GoogleIcon />
            Google
          </button>
          <button
            onClick={handleGitHubSignUp}
            type="button"
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#065F46]/15 bg-[#111827] text-sm font-bold text-white transition hover:bg-black"
            aria-label="Continue with GitHub"
          >
            <GitHubIcon />
            GitHub
          </button>
        </div>

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
