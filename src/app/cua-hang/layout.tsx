'use client';

import { MainLayoutRouter } from '@/components/Feature/Layouts/MainLayout/MainLayoutRouter';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';
import ChatWidget from '@/components/Chat/ChatWidget';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <SessionProvider>
        <NextTopLoader
          color="#FFFF"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #B86B2B,0 0 5px #B86B2B"
        />
        <Toaster position="top-right" />
        <MainLayoutRouter>{children}</MainLayoutRouter>
        <ChatWidget />
      </SessionProvider>
    </CartProvider>
  );
} 