// app/auth/verify/page.tsx
'use client'

import Link from 'next/link'

export default function VerifyPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card px-4 py-8 shadow rounded-lg sm:px-10 border border-border">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-foreground">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            We've sent a verification link to your email address. Please check your inbox and click the link to complete your registration.
          </p>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already verified?{' '}
            <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}