import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email và mật khẩu là bắt buộc');
        }

        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

          if (!data?.accessToken) {
            throw new Error('Không nhận được token từ server');
          }

          return {
            id: data.id,
            username: data.username,
            email: data.email,
            name: data.name || data.username,
            avatar: data.avatar,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            expiresIn: data.expiresIn,
            role: data.role,
            fullName: data.fullName,
          };
        } catch (error: any) {
          console.error('Auth error:', error);
          throw new Error(
            error?.response?.data?.message ||
              error?.message ||
              'Đăng nhập thất bại',
          );
        }
      },
    }),
  ],
  pages: {
    signIn: '/dang-nhap',
    error: '/dang-nhap',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.fullName = user.fullName;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.exp = Math.floor(Date.now() / 1000) + user.expiresIn;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (token.error === 'RefreshAccessTokenError') {
        throw new Error('RefreshAccessTokenError');
      }

      return {
        ...session,
        user: {
          id: token.id,
          username: token.username,
          email: token.email,
          fullName: token.fullName,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          role: token.role,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
