"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type ProvidersProp = {
  children: React.ReactNode;
  session?: Session;
};

const Providers = ({ children, session }: ProvidersProp) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Providers;
