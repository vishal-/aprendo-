
import React from 'react';

const SplitSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="teacher-section text-center">
          <div className="w-full h-64 bg-gray-300 mb-6 rounded-lg"></div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">For Teachers</h3>
          <p className="text-gray-600 mb-6">Create, distribute, and grade tests effortlessly. Save time and gain valuable insights into your students' performance.</p>
          <button className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600">Get Started as a Teacher</button>
        </div>
        <div className="student-section text-center">
          <div className="w-full h-64 bg-gray-300 mb-6 rounded-lg"></div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">For Students</h3>
          <p className="text-gray-600 mb-6">Prepare for exams, track your progress, and identify areas for improvement with our engaging practice tests.</p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600">Start Practicing as a Student</button>
        </div>
      </div>
    </section>
  );
};

export default SplitSection;
