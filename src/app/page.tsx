'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  const { status } = useSession();

  if (status === 'loading') {
    return <div className="h-screen">loading...</div>;
  }

  return redirect(status === 'authenticated' ? '/assets' : '/login');
}
