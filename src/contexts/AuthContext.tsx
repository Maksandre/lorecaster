"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { publicClient, createSessionClient, getAppId } from "../lib/lens";
import { Account } from "@lens-protocol/client";

interface AuthContextType {
  account: Account | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
  ConnectButton: React.ComponentType;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const isAuthenticated = !!account;

  const login = async () => {
    if (!address || !isConnected) {
      throw new Error("Wallet not connected");
    }

    setIsLoading(true);
    try {
      // Try to log in with the connected wallet
      const authenticated = await publicClient.login({
        onboardingUser: {
          app: getAppId(),
          wallet: address,
        },
        signMessage: async (message) => {
          return await signMessageAsync({ message });
        },
      });

      if (authenticated.isErr()) {
        console.error("Login failed:", authenticated.error);
        throw new Error(authenticated.error.message);
      }

      // Create session client
      const sessionClient = authenticated.value;
      createSessionClient(sessionClient);

      // Fetch user's account info
      // Note: Need to implement this based on app needs
      // const userAccount = await fetchUserAccount(address);
      // setAccount(userAccount);

      // For now, set a placeholder
      setAccount({
        address,
        // Add other account properties as needed
      } as Account);
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAccount(null);
    // Clear session storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("lens-auth");
    }
  };

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      if (!address || !isConnected) return;

      setIsLoading(true);
      try {
        // Check if there's an existing session
        // This is a placeholder - implement based on Lens SDK session management
        const existingSession = await publicClient.resumeSession();

        if (existingSession.isOk()) {
          createSessionClient(existingSession.value);
          // Fetch and set account data
          // setAccount(await fetchUserAccount(address));
        }
      } catch (error) {
        console.error("Session check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [address, isConnected]);

  // Custom connect button component
  const ConnectButton = () => <ConnectKitButton />;

  const value: AuthContextType = {
    account,
    isAuthenticated,
    isLoading,
    login,
    logout,
    ConnectButton,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
