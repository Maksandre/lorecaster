import { IStorageProvider } from "@lens-protocol/client";

// Local storage implementation for browser
export const storage: IStorageProvider = {
  async getItem(key: string): Promise<string | null> {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  },

  async setItem(key: string, value: string): Promise<void> {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  },

  async removeItem(key: string): Promise<void> {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },
};

// Helper functions for managing app-specific storage
export const storeUserData = async (key: string, data: any) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`lorecaster_${key}`, JSON.stringify(data));
  } catch (error) {
    console.error("Error storing user data:", error);
  }
};

export const getUserData = async (key: string) => {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(`lorecaster_${key}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
};

export const clearUserData = async (key: string) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(`lorecaster_${key}`);
  } catch (error) {
    console.error("Error clearing user data:", error);
  }
};
