import React from 'react';

const Features = () => {
  const features = [
    {
      title: "Easy Test Creation",
      description: "Build tests in minutes with our simple interface"
    },
    {
      title: "Instant Results",
      description: "Get immediate feedback and detailed analytics"
    },
    {
      title: "Works Everywhere",
      description: "Access from any device, anywhere, anytime"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need
          </h2>
          <p className="text-xl text-gray-600">
            Simple tools for effective testing
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;