'use client';

import { useSession } from 'next-auth/react';
import Footer from '../Footer';
import Header from '../Header';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export const MainLayoutRouter: React.FC<Props> = ({ children }) => {
  const session = useSession();

  if (session.status === 'unauthenticated') {
    redirect('/dang-nhap');
  }

  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};
