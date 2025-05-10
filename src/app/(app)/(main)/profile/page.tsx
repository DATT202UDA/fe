'use client';

import { ProfileInformation } from '@/views/main/Profile/components/Profile/ProfileInformation';
import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session, status } = useSession();

  console.log('Session status:', status);
  console.log('Session data:', session);

  if (status === 'loading') {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div className="container mx-auto py-8">
        Please sign in to view your profile
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <ProfileInformation />
    </div>
  );
}
