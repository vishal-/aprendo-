'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

const SignupPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-light">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-dark">Sign Up</h1>
                <div className="space-y-4">
          <button
            onClick={() => signIn('google')}
            className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm flex items-center justify-center space-x-3 bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-300"
          >
            <Image src="/google.svg" alt="Google Logo" width={20} height={20} />
            <span>Sign up with Google</span>
          </button>
          <button
            onClick={() => signIn('facebook')}
            className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm flex items-center justify-center space-x-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
          >
            <Image src="/facebook.svg" alt="Facebook Logo" width={20} height={20} />
            <span>Sign up with Facebook</span>
          </button>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <form className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-600 block">Name</label>
            <input type="text" className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block">Email</label>
            <input type="email" className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block">Password</label>
            <input type="password" className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block">Role</label>
            <select className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
            </select>
          </div>
          <button className="w-full py-2 text-white bg-primary rounded-lg hover:bg-secondary transition-colors duration-300">Sign Up</button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;