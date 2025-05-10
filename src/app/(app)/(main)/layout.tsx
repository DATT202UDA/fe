import { MainLayoutRouter } from '@/components/Feature/Layouts/MainLayout/MainLayoutRouter';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayoutRouter>{children}</MainLayoutRouter>;
}
