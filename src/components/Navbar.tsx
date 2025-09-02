
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
          <Link href="/">Aprendo</Link>
        </div>
        <div className="flex items-center space-x-8">
          <Link href="/about" className="text-gray-600 hover:text-blue-500">About</Link>
          <Link href="/features" className="text-gray-600 hover:text-blue-500">Features</Link>
          <Link href="/login" className="text-gray-600 hover:text-blue-500">Login</Link>
          <Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
