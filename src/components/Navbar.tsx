'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { auth } from '@/lib/firebase';

const Navbar = () => {
  const { user, loading } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Aprendo
          </Link>

          <div className="flex items-center space-x-6">
            {loading ? (
              <div>Loading...</div>
            ) : user ? (
              <>
                <span>{user.displayName || user.email}</span>
                <button onClick={() => auth.signOut()} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
