'use client';

import ChatWidget from '@/components/Chat/ChatWidget';
import NextTopLoader from 'nextjs-toploader';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from '@/contexts/CartContext';
import { InfoProvider } from '@/contexts/InfoContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function LocaleLayout({ children }: LayoutProps) {
  return (
    <CartProvider>
      <SessionProvider>
        <InfoProvider>
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
          {children}
          <ChatWidget />
        </InfoProvider>
      </SessionProvider>
    </CartProvider>
  );
}
