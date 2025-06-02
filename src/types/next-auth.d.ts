import 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    username: string;
    email: string;
    name?: string;
    avatar?: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    role: string;
  }

  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      name?: string;
      avatar?: string;
      accessToken: string;
      refreshToken: string;
      role: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    username: string;
    email: string;
    name?: string;
    avatar?: string;
    accessToken: string;
    refreshToken: string;
    exp: number;
    role: string;
    error?: string;
  }
}
