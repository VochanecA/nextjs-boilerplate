"use client";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor, Menu } from "lucide-react";
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

const inter = Inter({ subsets: ["latin"] });

// Define your default metadata
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        {/* Primary Meta Tags */}
        <title>{defaultMetadata.title}</title>
        <meta name="title" content={defaultMetadata.title} />
        <meta name="description" content={defaultMetadata.description} />
        <meta name="keywords" content={defaultMetadata.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Your Name or Company" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={defaultMetadata.url} />
        <meta property="og:title" content={defaultMetadata.title} />
        <meta property="og:description" content={defaultMetadata.description} />
        <meta property="og:image" content={defaultMetadata.image} />
        <meta property="og:site_name" content="Next.js Boilerplate" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={defaultMetadata.url} />
        <meta property="twitter:title" content={defaultMetadata.title} />
        <meta property="twitter:description" content={defaultMetadata.description} />
        <meta property="twitter:image" content={defaultMetadata.image} />
        <meta property="twitter:creator" content={defaultMetadata.twitterHandle} />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={defaultMetadata.url} />
        
        {/* Theme Color for Chrome, Firefox OS and Opera */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
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
              {/* Logo and Desktop Nav */}
              <div className="flex items-center gap-10">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <Image
                    src={orangeLogo}
                    alt="Alen Logo"
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

              {/* Desktop Theme Toggle and Auth Buttons */}
              <div className="hidden md:flex items-center gap-2">
                <ThemeToggle />
                <Button variant="outline">Login</Button>
                <Button>Sign Up</Button>
              </div>

              {/* Mobile Menu Trigger */}
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
                        alt="Alen Logo"
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
                      <Button variant="outline" className="w-full">Login</Button>
                      <Button className="w-full">Sign Up</Button>
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
                    alt="Alen Logo"
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