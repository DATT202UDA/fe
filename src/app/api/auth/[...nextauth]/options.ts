import { jwtDecode } from 'jwt-decode';
import { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export const parseTokenToUser = (token: string) => {
  const decodedToken = jwtDecode<{
    'https://hasura.io/jwt/claims': {
      'x-hasura-user-id': string;
      'x-hasura-user-email': string;
      'x-hasura-default-role': string;
    };
  }>(token);

  const claims = decodedToken['https://hasura.io/jwt/claims'];

  return {
    id: Number(claims['x-hasura-user-id']),
    email: claims['x-hasura-user-email'],
    role: claims['x-hasura-default-role'],
  };
};

export function getJwtExpiry(token: string) {
  const decoded = jwtDecode(token);

  return decoded.exp;
}

async function refreshToken(token: JWT): Promise<JWT> {
  console.log('**** Refreshing... ****', token?.sub);
  const refreshToken = token.backendTokens.refreshToken;

  //  Call api to refresh token
  const refreshTokenRes = '';
  const tokenRes = '';

  if (!refreshTokenRes) return token;
  console.log('**** Refreshed ****');

  const accessToken = tokenRes;

  return {
    ...token,
    backendTokens: {
      refreshToken: token.backendTokens.refreshToken,
      accessToken,
      expiresIn: getJwtExpiry(accessToken)! * 1000,
    },
  };
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials-google-token',
      type: 'credentials',
      name: 'credentials-google-token',
      credentials: {
        token: { label: 'token', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.token) return null;

        // Call api get user info
        const accessToken = '';
        const refreshToken = '';

        if (!accessToken) {
          return null;
        }

        const decoded = parseTokenToUser(accessToken);

        return {
          id: decoded.id.toString(),
          user: {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
          },
          backendTokens: {
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiresIn: getJwtExpiry(accessToken)! * 1000,
          },
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('[callbacks][jwt]', { exp: token?.backendTokens?.expiresIn });

      if (user) return { ...token, ...user };

      const now = Date.now();
      if (token.backendTokens?.expiresIn > now) {
        return token;
      }

      return await refreshToken(token);
    },

    async session({ token, session }) {
      console.log('[callbacks][session]', { exp: session.expires });

      if (token.newUser) {
        session.user = undefined;
        session.newUser = token.newUser as string;

        return session;
      }
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
  pages: {
    signIn: '/',
  },
};
