
import React from 'react';

const Hero = () => {
  return (
    <section className="bg-blue-50 py-20" style={{ backgroundImage: "url('/hero-bg.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-800">Practice. Learn. Excel.</h1>
        <p className="text-xl text-gray-600 mt-4">The ultimate platform for teachers and students to create and take tests.</p>
        <div className="mt-8 space-x-4">
          <button className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600">I’m a Teacher – Create a Test</button>
          <button className="bg-white text-blue-500 border border-blue-500 px-6 py-3 rounded-full hover:bg-blue-100">I’m a Student – Start Practicing</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
