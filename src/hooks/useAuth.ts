import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      // Force sign in to get a new refresh token
      signOut({
        redirect: false,
        callbackUrl: '/dang-nhap',
      }).then(() => {
        router.push('/dang-nhap');
      });
    }
  }, [session, router]);

  const signOutUser = async () => {
    await signOut({
      redirect: false,
      callbackUrl: '/dang-nhap',
    });
    router.push('/dang-nhap');
  };

  return {
    session,
    status,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    signOut: signOutUser,
  };
};
