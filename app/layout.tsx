"use client";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor, Menu, LogOut } from "lucide-react";
import orangeLogo from '@/public/orange-logo.png';
import Link from "next/link";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger 
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// Default metadata
const defaultMetadata = {
  title: "Next.js Boilerplate - Modern Web Development Starter",
  description: "A feature-rich Next.js boilerplate with TypeScript, Tailwind CSS, and modern web development tools to kickstart your projects.",
  keywords: "Next.js, boilerplate, TypeScript, Tailwind CSS, React, web development, starter template",
  url: "https://yourwebsite.com",
  image: "https://yourwebsite.com/og-image.jpg",
  twitterHandle: "@yourhandle"
};

const navItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
];

function ThemeToggle({ mobile = false }: { mobile?: boolean }) {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={mobile ? "ghost" : "outline"} size={mobile ? "sm" : "icon"} className={mobile ? "w-full justify-start" : ""}>
          {mobile ? (
            <>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 mr-2" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 mr-2" />
              <span>Theme</span>
            </>
          ) : (
            <>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={mobile ? "start" : "end"}>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserAvatar({ session }: { session: any }) {
  const router = useRouter();
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="flex items-center gap-4">
   <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
      <Image
        src="/alex.png"
        alt={session.user.email || "User"}
        width={32}
        height={32}
        className="rounded-full"
      />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem className="flex flex-col items-start gap-1 pointer-events-none">
      <p className="font-medium">{session.user.user_metadata?.display_name || session.user.email}</p>
      <p className="text-xs text-muted-foreground">{session.user.email}</p>
    </DropdownMenuItem>
    {/* New Dashboard Link */}
    <DropdownMenuItem asChild>
      <a href="/dashboard" className="flex items-center gap-2">
        <span>Dashboard</span>
      </a>
    </DropdownMenuItem>
    {/* Sign-out Button */}
    <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
      <LogOut className="mr-2 h-4 w-4" />
      <span>Sign out</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} flex items-center justify-center h-screen`}>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>{defaultMetadata.title}</title>
        <meta name="description" content={defaultMetadata.description} />
        <meta name="keywords" content={defaultMetadata.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={defaultMetadata.title} />
        <meta property="og:description" content={defaultMetadata.description} />
        <meta property="og:image" content={defaultMetadata.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
              <div className="flex items-center gap-10">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <Image
                    src={orangeLogo}
                    alt="Logo"
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full"
                  />
                  <span>Next.js Boilerplate</span>
                </Link>
                
                <nav className="hidden md:flex gap-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="hidden md:flex items-center gap-4">
                <ThemeToggle />
                {session ? (
                  <UserAvatar session={session} />
                ) : (
                  <>
                    <Button variant="outline" asChild>
                      <Link href="/auth/login">Login</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/auth/signup">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>

              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Image
                        src={orangeLogo}
                        alt="Logo"
                        width={24}
                        height={24}
                        className="h-6 w-6 rounded-full"
                      />
                      <span>Menu</span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-8">
                    <nav className="flex flex-col gap-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="text-lg font-medium py-2 px-4 rounded-md hover:bg-accent"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                    <div className="border-t border-border pt-4">
                      <ThemeToggle mobile />
                    </div>
                    <div className="flex flex-col gap-2">
                      {session ? (
                        <Button 
                          variant="destructive" 
                          className="w-full"
                          onClick={async () => {
                            await supabase.auth.signOut();
                            router.refresh();
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </Button>
                      ) : (
                        <>
                          <Button variant="outline" className="w-full" asChild>
                            <Link href="/auth/login">Login</Link>
                          </Button>
                          <Button className="w-full" asChild>
                            <Link href="/auth/signup">Sign Up</Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </header>

          <main className="flex-1">{children}</main>
          
          <footer className="border-t border-border bg-background py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                <div className="flex items-center gap-2">
                  <Image
                    src={orangeLogo}
                    alt="Logo"
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full"
                    priority
                  />
                  <span className="text-lg font-semibold">Next.js Boilerplate</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Next.js Boilerplate. All rights reserved.
                </p>
                <div className="flex gap-6">
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms
                  </a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy
                  </a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}