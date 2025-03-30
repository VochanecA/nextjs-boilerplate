import { Metadata } from "next";
import {
  Hero1,
  Features,
  Pricing,
  CTA,
  VideoDemo,
  GitHubStats
} from "./dynamic-components";

export const metadata: Metadata = {
  title: "Next.js Boilerplate - Launch Your SaaS Faster",
  description: "The ultimate Next.js starter kit with authentication, theming, payments, and more.",
};
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero1 />

      {/* Tech Stack Logos */}
      <section className="bg-card py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-muted-foreground">
            Trusted by developers at
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { name: "Next.js", logo: "/next.png" },
              { name: "Vercel", logo: "/vercel.png" },
              { name: "Prisma", logo: "/prisma.svg" },
              { name: "Stripe", logo: "/stripe.png" },
              { name: "Clerk", logo: "/clerk.png" },
              { name: "Tailwind", logo: "/tailwind.svg" },
            ].map((tech) => (
              <div key={tech.name} className="flex justify-center">
                <img
                  className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                  src={tech.logo}
                  alt={tech.name}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Video Demo Section */}
      <section className="bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              See it in action
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Watch our 2-minute demo to see how quickly you can get started.
            </p>
          </div>
          <div className="mt-16">
            <VideoDemo />
          </div>
        </div>
      </section>

      {/* GitHub Stats */}
      <GitHubStats />

      {/* Team Section */}
      <section className="bg-card py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Meet the creators
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The team behind this boilerplate.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Alex Johnson",
                role: "Founder",
                image: "/team/alex.jpg",
                bio: "Full-stack developer with 10+ years of experience building SaaS products.",
              },
              {
                name: "Sarah Chen",
                role: "UI/UX Designer",
                image: "/team/sarah.jpg",
                bio: "Specializes in creating intuitive developer experiences.",
              },
              {
                name: "Miguel Rodriguez",
                role: "DevOps Engineer",
                image: "/team/miguel.jpg",
                bio: "Ensures the boilerplate is production-ready and scalable.",
              },
            ].map((person) => (
              <div key={person.name} className="text-center">
                <img
                  className="mx-auto h-40 w-40 rounded-full object-cover"
                  src={person.image}
                  alt={person.name}
                />
                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  {person.name}
                </h3>
                <p className="text-sm text-muted-foreground">{person.role}</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  {person.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Loved by developers
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote: "This boilerplate saved me weeks of development time.",
                  author: "Alex Johnson",
                  role: "Full-stack Developer",
                },
                {
                  quote: "The perfect foundation for any SaaS project.",
                  author: "Sarah Chen",
                  role: "Startup Founder",
                },
                {
                  quote: "Clean code and great documentation.",
                  author: "Miguel Rodriguez",
                  role: "CTO",
                },
              ].map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="rounded-xl border border-border bg-card p-8 shadow-sm"
                >
                  <p className="text-lg text-muted-foreground">
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-6">
                    <p className="font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />

      {/* Final CTA Section */}
      <CTA />


    </main>
  );
}