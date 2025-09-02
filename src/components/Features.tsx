
import React from 'react';

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="feature-item">
            <div className="text-4xl text-blue-500 mb-4">Icon 1</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Test Creation</h3>
            <p className="text-gray-600">Create and customize tests in minutes with our intuitive interface.</p>
          </div>
          <div className="feature-item">
            <div className="text-4xl text-blue-500 mb-4">Icon 2</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Practice Anywhere</h3>
            <p className="text-gray-600">Access tests online or offline, on any device, anytime.</p>
          </div>
          <div className="feature-item">
            <div className="text-4xl text-blue-500 mb-4">Icon 3</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Instant Progress Tracking</h3>
            <p className="text-gray-600">Get immediate feedback and track your performance over time.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
