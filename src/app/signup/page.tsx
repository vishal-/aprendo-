'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const SignupPage = () => {
  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-light">Sign Up</h1>
        <div className="space-y-4">
          <button
            onClick={handleGoogleSignup}
            className="w-full py-2 px-4 border border-gray-600 rounded-lg shadow-sm flex items-center justify-center space-x-3 bg-gray-700 text-light hover:bg-gray-600 transition-colors duration-300"
          >
            <Image src="/google.svg" alt="Google Logo" width={20} height={20} />
            <span>Sign up with Google</span>
          </button>
        </div>
        <p className="text-sm text-center text-gray-400">
          Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
