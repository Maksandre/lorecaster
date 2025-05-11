"use client";

import { createPublicClient, http } from "viem";
import { chains } from "@lens-chain/sdk/viem";
import { WagmiProvider, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const queryClient = new QueryClient();

const config = createConfig(
  getDefaultConfig({
    chains: [chains.testnet, chains.mainnet],
    transports: {
      [chains.testnet.id]: http(chains.testnet.rpcUrls.default.http[0]),
      [chains.mainnet.id]: http(chains.mainnet.rpcUrls.default.http[0]),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    appName: process.env.NEXT_PUBLIC_APP_NAME || "Lorecaster",
    appDescription: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Decentralized Fanfiction Platform",
    appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://lorecaster.lens",
    appIcon: "https://lorecaster.lens/icon.png",
  }),
);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
