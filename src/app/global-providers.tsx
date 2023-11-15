"use client";

import { QueryClient, QueryClientProvider } from "react-query";

function GlobalProviders({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default GlobalProviders;
