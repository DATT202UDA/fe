import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/dang-nhap',
    },
  },
);

export const config = {
  matcher: [
    // '/dashboard/:path*',
    // '/profile/:path*',
    // '/settings/:path*',
    // '/admin/:path*',
    // Add other protected routes here
  ],
};
