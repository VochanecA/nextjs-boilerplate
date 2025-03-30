"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

export const Hero1 = dynamic(() => import('@/components/Hero'), {
  loading: () => <Skeleton className="h-[80vh] w-full" />,
  ssr: false
});

export const Features = dynamic(() => import('@/components/Features'), {
  loading: () => <Skeleton className="h-[60vh] w-full" />,
  ssr: false
});

export const Pricing = dynamic(() => import('@/components/Pricing'), {
  loading: () => <Skeleton className="h-[70vh] w-full" />,
  ssr: false
});

export const CTA = dynamic(() => import('@/components/CTA'), {
  loading: () => <Skeleton className="h-[40vh] w-full" />,
  ssr: false
});

export const VideoDemo = dynamic(() => import('@/components/VideoDemo'), {
  loading: () => <Skeleton className="h-96 w-full rounded-lg" />,
  ssr: false
});

export const GitHubStats = dynamic(() => import('@/components/GitHubStats'), {
  loading: () => (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Skeleton className="h-8 w-48 mx-auto" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-10 w-10 mx-auto rounded-full" />
              <Skeleton className="h-8 w-24 mx-auto" />
              <Skeleton className="h-6 w-16 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
  ssr: false
});