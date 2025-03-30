"use client";

import { useState, useEffect } from 'react';
import { Star, GitFork, Eye } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton"; // Now this will work

interface GitHubStats {
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
}

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('https://api.github.com/repos/your-username/your-repo');
        if (!res.ok) throw new Error('Failed to fetch GitHub stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (error) return null;

  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Our GitHub Stats
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {loading ? (
            <>
              <div className="space-y-2">
                <Skeleton className="h-10 w-10 mx-auto rounded-full" />
                <Skeleton className="h-8 w-24 mx-auto" />
                <Skeleton className="h-6 w-16 mx-auto" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-10 w-10 mx-auto rounded-full" />
                <Skeleton className="h-8 w-24 mx-auto" />
                <Skeleton className="h-6 w-16 mx-auto" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-10 w-10 mx-auto rounded-full" />
                <Skeleton className="h-8 w-24 mx-auto" />
                <Skeleton className="h-6 w-16 mx-auto" />
              </div>
            </>
          ) : stats ? (
            <>
              <StatCard 
                icon={<Star className="h-8 w-8 text-yellow-500" />}
                value={stats.stargazers_count}
                label="Stars"
              />
              <StatCard 
                icon={<GitFork className="h-8 w-8 text-blue-500" />}
                value={stats.forks_count}
                label="Forks"
              />
              <StatCard 
                icon={<Eye className="h-8 w-8 text-purple-500" />}
                value={stats.watchers_count}
                label="Watchers"
              />
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode, value: number, label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>
      <p className="mt-4 text-3xl font-bold text-foreground">
        {value.toLocaleString()}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}