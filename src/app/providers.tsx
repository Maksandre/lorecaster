"use client";

import { Web3Provider } from "../providers/Web3Provider";
import { AuthProvider } from "../contexts/AuthContext";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { ClientOnly } from "../components/ClientOnly";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Web3Provider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <ClientOnly>
            <Header />
          </ClientOnly>
          <main className="flex-1">{children}</main>
          <ClientOnly>
            <Footer />
          </ClientOnly>
        </div>
      </AuthProvider>
    </Web3Provider>
  );
}
