import NextAuth from 'next-auth';
import { NextRequest } from 'next/server';
import { authOptions } from './options';

type RouteHandlerContext = { params: { nextauth: string[] } };

const handler = async (req: NextRequest, context: RouteHandlerContext) => {
  return await NextAuth(req, context, authOptions());
};

export { handler as GET, handler as POST };
