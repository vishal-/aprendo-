'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const { user, setUser, loading, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-light">
            Aprendo
          </Link>

          <div className="flex items-center space-x-6">
            {loading ? (
              <div>Loading...</div>
            ) : user ? (
              <>
                <span className="text-light">{user.displayName || user.email}</span>
                <button onClick={() => auth.signOut()} className="bg-primary text-dark px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/auth" className="bg-primary text-dark px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
