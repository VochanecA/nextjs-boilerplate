"use client";

import { useTheme } from "next-themes";

const features = [
  {
    name: "Authentication",
    description: "Pre-built auth with Clerk, including user management and social logins.",
    icon: "🔐",
  },
  {
    name: "Theming",
    description: "Dark/light mode with ShadCN UI components, fully customizable.",
    icon: "🎨",
  },
  {
    name: "Database",
    description: "Prisma ORM configured with PostgreSQL/SQLite support.",
    icon: "💾",
  },
  {
    name: "Payments",
    description: "Stripe integration ready for subscriptions and one-time payments.",
    icon: "💳",
  },
];

export default function Features() {
  const { theme } = useTheme();

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Build faster</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to launch
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our boilerplate includes all the essential features so you can focus on your product.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <span className="text-xl">{feature.icon}</span>
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}