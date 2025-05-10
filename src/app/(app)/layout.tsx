import ChatWidget from '@/components/Chat/ChatWidget';
import NextTopLoader from 'nextjs-toploader';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { Toaster } from 'react-hot-toast';

interface LangLayoutProps {
  children: React.ReactNode;
}

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({}: Omit<LangLayoutProps, 'children'>) {
  return {
    title: 'Đồ Gia Dụng',
  };
}
export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
      {children}
      <ChatWidget />
    </SessionProvider>
  );
}
