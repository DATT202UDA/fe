'use client';

import { ProfileInformation } from '@/views/main/Profile/components/Profile/ProfileInformation';
import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session, status } = useSession();

  return (
    // <div className="container mx-auto py-8">
    <ProfileInformation />
    // </div>
  );
}
