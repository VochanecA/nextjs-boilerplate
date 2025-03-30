"use client";

import { useTheme } from "next-themes";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Starter",
    id: "tier-starter",
    href: "#",
    price: "$0",
    description: "Perfect for kicking the tires and small projects",
    features: [
      "Basic authentication",
      "Community support",
      "Example pages",
      "MIT License",
    ],
    featured: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    href: "#",
    price: "$99",
    description: "Everything you need for serious development",
    features: [
      "Everything in Starter",
      "Priority support",
      "Commercial license",
      "Stripe integration",
      "Admin dashboard",
    ],
    featured: false,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    price: "$299",
    description: "For large-scale commercial applications",
    features: [
      "Everything in Pro",
      "Dedicated support",
      "Custom integrations",
      "White-label options",
      "Team onboarding",
      "Priority feature requests",
    ],
    featured: true,
  },
];

export default function Pricing() {
  const { theme } = useTheme();

  return (
    <div className="bg-card py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Start for free, upgrade when you're ready.
          </p>
        </div>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-12 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`
                rounded-3xl border border-border p-8 ring-1 ring-border sm:p-10
                ${tier.featured ? "bg-primary/5 ring-2 ring-primary" : "bg-background"}
                transition-all hover:shadow-lg
              `}
            >
              <h3
                id={tier.id}
                className={`text-2xl font-bold tracking-tight ${
                  tier.featured ? "text-primary" : "text-foreground"
                }`}
              >
                {tier.name}
              </h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className={`text-4xl font-bold tracking-tight ${
                  tier.featured ? "text-primary" : "text-foreground"
                }`}>
                  {tier.price}
                </span>
                {tier.price !== "$0" && (
                  <span className="text-sm font-semibold leading-6 text-muted-foreground">
                    /one-time
                  </span>
                )}
              </p>
              <Button
                size="lg"
                className={`mt-6 w-full ${
                  tier.featured ? "bg-primary hover:bg-primary/90" : ""
                }`}
                variant={tier.featured ? "default" : tier.price === "$0" ? "outline" : "default"}
              >
                {tier.price === "$0" ? "Get started" : "Buy now"}
              </Button>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className={`h-6 w-5 flex-none ${
                        tier.featured ? "text-primary" : "text-indigo-600"
                      }`}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}