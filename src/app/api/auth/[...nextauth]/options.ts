import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const authOptions = (): AuthOptions => {
  return {
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
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              expiresIn: data.expiresIn,
              role: data.role,
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
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
          token.exp = Math.floor(Date.now() / 1000) + user.expiresIn;
          token.role = user.role;
        }

        // Kiểm tra nếu token sắp hết hạn (trước 5 phút)
        if (
          token.exp &&
          typeof token.exp === 'number' &&
          Date.now() >= (token.exp - 300) * 1000
        ) {
          return refreshAccessToken(token);
        }

        return token;
      },

      async session({ session, token }) {
        return {
          ...session,
          user: {
            id: token.id,
            username: token.username,
            email: token.email,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            role: token.role,
          },
        };
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  };
};

async function refreshAccessToken(token: any) {
  try {
    if (!token.refreshToken) {
      throw new Error('Missing refresh token');
    }

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        refreshToken: token.refreshToken,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const nowInSec = Math.floor(Date.now() / 1000);
    const expiresIn = 60 * 60; // 1 giờ

    return {
      ...token,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      exp: nowInSec + expiresIn,
      error: undefined,
    };
  } catch (error: any) {
    console.error('Error refreshing access token:', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
