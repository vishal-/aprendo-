
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white py-8">
      <div className="container mx-auto text-center text-gray-600">
        <div className="space-x-8">
          <Link href="/contact" className="hover:text-blue-500">Contact</Link>
          <Link href="/privacy" className="hover:text-blue-500">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-blue-500">Terms of Service</Link>
          <Link href="/help" className="hover:text-blue-500">Help Center</Link>
        </div>
        <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} Aprendo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
