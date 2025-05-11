"use client";

import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Lorecaster
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Decentralized fanfiction on Lens Protocol
        </p>
        
        <div className="space-x-4">
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="inline-block px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/explore"
              className="inline-block px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Explore Stories
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}