"use client";

import { SessionProvider } from "next-auth/react";

export const SessionProviders = (props: React.PropsWithChildren) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};
