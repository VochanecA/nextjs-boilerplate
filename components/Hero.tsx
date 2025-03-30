"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { Session } from "@supabase/supabase-js";

interface HeroProps {
  session: Session | null;
}

export default function Hero({ session }: HeroProps) {
  const { theme } = useTheme();

  return (
    <div className="bg-background">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-cpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Speed up your SaaS{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-[#9089fc] inline-block text-transparent bg-clip-text">
                development
              </span>
            </h1>
            <p className="mt-10 text-lg leading-8 text-muted-foreground">
              A NextJS 15 boilerplate with pretty much all you need to start
              developing your SaaS projects. No more boring setups, clone, code
              and ship fast your apps.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-6">
              <div className="flex w-full justify-center">
                <p className="border rounded-lg p-4 shadow-sm border-border backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:p-4 bg-card/30">
                  Next.js 15 Starter Kit - Get started by editing&nbsp;
                  <code className="font-mono font-bold">app/page.tsx</code>
                </p>
              </div>
              
              {/* Auth-aware buttons */}
              <div className="flex items-center gap-x-6">
                {session ? (
                  <Link
                    href="/dashboard"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/auth/signup"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                    >
                      Get started
                    </Link>
                    <Link
                      href="/auth/login"
                      className="text-sm font-semibold leading-6 text-foreground hover:text-indigo-500 transition-colors"
                    >
                      Sign in <span aria-hidden="true">→</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}