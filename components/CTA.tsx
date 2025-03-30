"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function CTA() {
  const { theme } = useTheme();

  return (
    <div className="bg-card py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to boost your productivity?
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Start building your SaaS application today with our Next.js boilerplate.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg">
              Get started
            </Button>
            <Button variant="outline" size="lg">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}