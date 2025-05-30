import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

    // Kiểm tra nếu là route admin và user không có role ADMIN
    if (isAdminRoute && token?.role?.toLowerCase() !== 'admin') {
      return NextResponse.redirect(new URL('/dang-nhap', req.url));
    }

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
    '/admin/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
  ],
};
