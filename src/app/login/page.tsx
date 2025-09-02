
import React from 'react';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-light">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-dark">Login</h1>
        <form className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-600 block">Email</label>
            <input type="email" className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block">Password</label>
            <input type="password" className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <button className="w-full py-2 text-white bg-primary rounded-lg hover:bg-secondary transition-colors duration-300">Login</button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account? <Link href="/signup" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
