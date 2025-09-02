
'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="flex items-center justify-center min-h-screen bg-light">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-dark">Login</h1>
        <div className="space-y-4">
          <button
            onClick={() => signIn('google')}
            className="w-full py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => signIn('facebook')}
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Sign in with Facebook
          </button>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn('email', { email });
          }}
          className="space-y-6"
        >
          <div>
            <label className="text-sm font-bold text-gray-600 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button type="submit" className="w-full py-2 text-white bg-primary rounded-lg hover:bg-secondary transition-colors duration-300">
            Sign in with Email
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account? <Link href="/signup" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
