import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="min-h-screen bg-white flex items-center">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Testing made
            <span className="text-primary block">simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Create, manage, and take tests effortlessly. Built for teachers and students who value simplicity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/teacher/dashboard" className="bg-primary text-white px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors text-center">
              For Teachers
            </Link>
            <Link href="/student/tests" className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center">
              For Students
            </Link>
          </div>
        </div>
        <div className="bg-gray-50 rounded-2xl p-8 h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500">Clean, intuitive interface</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;