import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  concat,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { OperationDefinitionNode } from 'graphql';
import { getMainDefinition } from '@apollo/client/utilities';
import { getSession } from 'next-auth/react';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  fetch,
});

// Check if window is defined
const isBrowser = typeof window !== 'undefined';

const authLink = setContext(async (_, { headers = {} }) => {
  const session = await getSession();
  const token = session?.backendTokens?.accessToken;

  if (token) {
    headers['authorization'] = `Bearer ${token}`;
  }

  return {
    headers: {
      ...headers,
    },
  };
});

// Only create WebSocketLink if in the browser
const wsLink = isBrowser
  ? new WebSocketLink(
      new SubscriptionClient(process.env.NEXT_PUBLIC_GRAPHQL_WEBSOCKET!, {
        reconnect: true,
        timeout: 30000,
        connectionParams: async () => {
          const session = await getSession();

          return {
            headers: {
              Authorization: `Bearer ${session?.backendTokens.accessToken}`,
            },
          };
        },
        connectionCallback: (err) => {
          if (err) {
            console.log('WS connectionCallback Error', err);
            wsLink!['subscriptionClient']?.close(true, true);
          }
        },
      }),
    )
  : null;

const link = wsLink
  ? split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(
          query,
        ) as OperationDefinitionNode;

        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpLink,
    )
  : httpLink;

const errorLink = onError(({ graphQLErrors = [], operation, forward }) => {
  console.log('graphQLErrors', graphQLErrors);

  for (const graphQLError of graphQLErrors) {
    const extensions = graphQLError.extensions || {};
    console.log('GraphQLError', extensions);
  }
});

export const cache = new InMemoryCache();

export const client = new ApolloClient({
  ssrMode: !isBrowser,
  link: concat(errorLink, concat(authLink, link)),
  cache,
  connectToDevTools: isBrowser && process.env.NODE_ENV !== 'production',
});
