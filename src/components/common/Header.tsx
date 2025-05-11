"use client";

import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { isAuthenticated, account, logout, ConnectButton } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Lorecaster
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link href="/stories" className="text-gray-600 hover:text-gray-900">
              Stories
            </Link>
            <Link href="/fandoms" className="text-gray-600 hover:text-gray-900">
              Fandoms
            </Link>
            <Link href="/writers" className="text-gray-600 hover:text-gray-900">
              Writers
            </Link>
            {isAuthenticated && (
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
            )}

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {account?.address?.slice(0, 6)}...{account?.address?.slice(-4)}
                  </span>
                  <button onClick={logout} className="text-sm text-gray-600 hover:text-gray-900">
                    Logout
                  </button>
                </div>
              ) : (
                <ConnectButton />
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
