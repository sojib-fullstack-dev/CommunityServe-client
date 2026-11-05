import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Suspense } from 'react';
import { connection } from 'next/server';
import Link from 'next/link';
import { CalendarDays, Mail, ShieldCheck, UserRound } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import BtnProfile from '@/components/Eventcard/BtnProfile';

export default async function ProfilePage() {
  return (
    <section className="min-h-screen bg-[#F8F5EC] px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8">
      <Suspense>
        <div className="mx-auto max-w-5xl">
          <ProfileSuspense />
        </div>
      </Suspense>
    </section>
  );
}

export async function ProfileSuspense() {
  await connection();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="rounded-2xl border border-[#E5ECE8] bg-white px-6 py-12 text-center shadow-[0_8px_30px_rgba(31,78,68,0.08)]">
        <UserRound className="mx-auto size-12 text-[#065F46]" />
        <h1 className="mt-4 text-2xl font-bold text-[#063E35]">Profile</h1>
        <p className="mt-2 text-[#687A75]">Please login to view your profile.</p>
        <Link
          href="/login"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[#008C45] px-6 font-bold text-white transition hover:bg-[#067A43]"
        >
          Login
        </Link>
      </div>
    );
  }

  const displayName = user.name || 'CommunityServe Member';
  const initials = displayName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-6">
      <header className="overflow-hidden rounded-3xl border border-[#E5ECE8] bg-white shadow-[0_8px_30px_rgba(31,78,68,0.08)]">
        <div className="h-36 bg-[#065F46] sm:h-44">
          <div className="h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_45%)]" />
        </div>

        <div className="px-5 pb-7 sm:px-8 sm:pb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="-mt-12 flex items-end gap-4 sm:-mt-14 sm:gap-5">
              <Avatar className="size-24 border-4 border-white bg-[#EDF3F0] shadow-md sm:size-28">
                <AvatarImage referrerPolicy="no-referrer" src={user.image || ''} />
                <AvatarFallback className="bg-[#E8F2EE] text-2xl font-bold text-[#065F46]">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="pb-1 sm:pb-0">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F97316]">
                  Member profile
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-[#063E35] sm:text-3xl">
                    {displayName}
                  </h1>
                   <BtnProfile defaultName={displayName} />
                </div>
              </div>
            </div>

            <Link
              href="/manage-event"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-[#DCE7E3] px-5 text-sm font-bold text-[#065F46] transition hover:border-[#065F46] hover:bg-[#F7F9F7]"
            >
              Manage Events
            </Link>
          </div>
        </div>
      </header>

      <main className="grid gap-6 md:grid-cols-[1fr_280px]">
        <section className="rounded-2xl border border-[#E5ECE8] bg-white p-5 shadow-[0_8px_30px_rgba(31,78,68,0.08)] sm:p-7">
          <h2 className="text-lg font-bold text-[#063E35]">Account information</h2>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-4 rounded-xl bg-[#F7F9F7] px-4 py-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E8F2EE] text-[#065F46]">
                <Mail className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-[#7A9189]">Email</p>
                <p className="mt-1 truncate font-semibold text-[#244B44]">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-[#F7F9F7] px-4 py-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FFF0E8] text-[#F97316]">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#7A9189]">Account status</p>
                <p className="mt-1 font-semibold text-[#244B44]">Active member</p>
              </div>
            </div>
          </div>
        </section>

        <aside className="rounded-2xl border border-[#E5ECE8] bg-white p-5 shadow-[0_8px_30px_rgba(31,78,68,0.08)] sm:p-6">
          <h2 className="text-lg font-bold text-[#063E35]">Quick links</h2>
          <div className="mt-4 space-y-2">
            <Link
              href="/join-event"
              className="flex items-center gap-3 rounded-xl px-3 py-3 font-semibold text-[#244B44] transition hover:bg-[#F7F9F7] hover:text-[#F97316]"
            >
              <CalendarDays className="size-5 text-[#065F46]" />
              Joined Events
            </Link>
            <Link
              href="/create-event"
              className="flex items-center gap-3 rounded-xl px-3 py-3 font-semibold text-[#244B44] transition hover:bg-[#F7F9F7] hover:text-[#F97316]"
            >
              <UserRound className="size-5 text-[#065F46]" />
              Create an Event
            </Link>
          </div>
        </aside>
      </main>
    </div>
  );
}
