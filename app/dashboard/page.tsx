"use client";
import { useTheme } from "@/components/theme-provider";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  CreditCard,
  LogOut,
  Sun,
  Moon,
  Monitor,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  href: string;
}

interface UserProfile {
  id: string;
  email: string;
  display_name: string | null;
  created_at?: string;
  updated_at?: string;
}

export default function Dashboard() {
  const { theme, setTheme } = useTheme();
  const [session, setSession] = useState<Session | null>(null);
  const [userDetails, setUserDetails] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const menuItems: MenuItem[] = [
    { name: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, href: '/dashboard' },
    { name: 'Projects', icon: <FileText className="h-5 w-5" />, href: '/dashboard/projects' },
    { name: 'Team', icon: <Users className="h-5 w-5" />, href: '/dashboard/team' },
    { name: 'Billing', icon: <CreditCard className="h-5 w-5" />, href: '/dashboard/billing' },
    { name: 'Settings', icon: <Settings className="h-5 w-5" />, href: '/dashboard/settings' },
  ];

  useEffect(() => {
    const getSessionAndProfile = async () => {
      try {
        setLoading(true);
        
        // Get session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (!session || sessionError) {
          router.push('/auth/login');
          return;
        }
        
        setSession(session);

        // Get user profile
const { data: profileData, error: profileError } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', session.user.id)
  .single();

if (profileError) {
  // Fallback to auth user data
  setUserDetails({
    id: session.user.id,
    email: session.user.email || '',
    display_name: session.user.user_metadata?.display_name || null
  });
} else {
  setUserDetails(profileData);
}

      } catch (error) {
        console.error('Dashboard error:', error);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    getSessionAndProfile();

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/auth/login');
      }
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!session) {
    return null; // or redirect to login
  }

  const getUserInitial = () => {
    return userDetails?.display_name?.[0]?.toUpperCase() || 
           session?.user.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex w-64 flex-col border-r border-border">
          <div className="flex h-16 flex-shrink-0 items-center px-4">
            <h1 className="text-xl font-bold text-foreground">Next.js Dashboard</h1>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 p-4">
            <div className="group block w-full flex-shrink-0">
              <div className="flex items-center">
                <div>
                  <div className="flex items-center">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 dark:bg-indigo-900 dark:text-indigo-300">
                      {getUserInitial()}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-foreground">
                        {userDetails?.display_name || session.user.email}
                      </p>
                      <button
                        onClick={handleSignOut}
                        className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-1" /> Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navigation */}
        <div className="flex h-16 flex-shrink-0 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex flex-1 justify-between px-4">
            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground focus:outline-none"
              >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" />
              </button>
            </div>
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
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
            </div>
          </div>
        </div>

        {/* Main area */}
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h2>
              <p className="mt-2 text-muted-foreground">
                Welcome back, {userDetails?.display_name || session.user.email}
              </p>

              {/* User Info Card */}
              <div className="mt-8">
                <div className="border rounded-lg p-6 shadow-sm border-border bg-card">
                  <h3 className="text-lg font-medium text-foreground mb-4">User Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="text-foreground">
                        {userDetails?.display_name || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-foreground">{session.user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Account Created</p>
                      <p className="text-foreground">
                        {new Date(session.user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Sign In</p>
                      <p className="text-foreground">
                        {session.user.last_sign_in_at
                          ? new Date(session.user.last_sign_in_at).toLocaleString()
                          : 'Never'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard Stats */}
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: 'Total Projects', value: '12', change: '+2 from last month' },
                  { name: 'Team Members', value: '5', change: '+1 from last month' },
                  { name: 'Active Subscriptions', value: '3', change: 'No change' },
                ].map((stat) => (
                  <div
                    key={stat.name}
                    className="border rounded-lg p-6 shadow-sm border-border bg-card"
                  >
                    <h3 className="text-sm font-medium text-muted-foreground">{stat.name}</h3>
                    <p className="mt-2 text-3xl font-semibold text-foreground">{stat.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.change}</p>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="mt-8 border rounded-lg p-6 shadow-sm border-border bg-card">
                <h3 className="text-lg font-medium text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { id: 1, action: 'Created project "Marketing Website"', time: '2 hours ago' },
                    { id: 2, action: 'Invited team member "alex@example.com"', time: '1 day ago' },
                    { id: 3, action: 'Updated billing information', time: '2 days ago' },
                  ].map((activity) => (
                    <div key={activity.id} className="flex items-start">
                      <div className="h-2 w-2 mt-2 rounded-full bg-indigo-500 mr-3"></div>
                      <div>
                        <p className="text-foreground">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
