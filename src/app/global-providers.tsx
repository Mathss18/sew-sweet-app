"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { sideBarOpenState } from "@/recoil/atoms";
import { Toaster } from "react-hot-toast";

function GlobalProviders({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot
        initializeState={({ set }) => {
          set(sideBarOpenState, false);
        }}
      >
        <Toaster position="top-right" />
        {children}
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default GlobalProviders;
