
import { GuestLayoutRouter } from '@/components';

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuestLayoutRouter>{children}</GuestLayoutRouter>;
}
