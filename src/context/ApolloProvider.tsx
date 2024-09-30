"use client";
import { client } from "@/apolloClient";
import { ApolloProvider } from "@apollo/client";

export const ApolloProviders = (props: React.PropsWithChildren) => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
