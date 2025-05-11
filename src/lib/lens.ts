import { PublicClient, SessionClient } from "@lens-protocol/client";
import { mainnet, testnet } from "@lens-protocol/client";
import { storage } from "./storage";

// Get the current environment
const getEnvironment = () => {
  const network = process.env.NEXT_PUBLIC_LENS_NETWORK;
  return network === "mainnet" ? mainnet : testnet;
};

// Public client (no authentication required)
export const publicClient = PublicClient.create({
  environment: getEnvironment(),
  storage,
});

// Session client will be created after authentication
export let sessionClient: SessionClient | null = null;

// Function to create session client after login
export const createSessionClient = (newSessionClient: SessionClient) => {
  sessionClient = newSessionClient;
  return sessionClient;
};

// Helper function to get the current app ID
export const getAppId = () => {
  return process.env.NEXT_PUBLIC_LENS_APP_ID || "";
};

// Helper function to switch networks
export const switchNetwork = (network: "mainnet" | "testnet") => {
  // Implementation for network switching would go here
  // Note: This would require updating the environment and recreating clients
  console.log(`Switching to ${network}...`);
};

// Lens API endpoint
export const getLensApiEndpoint = () => {
  return process.env.NEXT_PUBLIC_LENS_API_ENDPOINT || "https://api.testnet.lens.xyz/graphql";
};
