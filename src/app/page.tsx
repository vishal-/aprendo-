import Link from 'next/link';

export default function Home() {
  return (
    <div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            Streamline Your Testing Process
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto">
            A simple and efficient platform for educators to create, manage, and grade tests,
            while offering students a straightforward way to take them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/teacher/dashboard" className="bg-primary text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-secondary">
              I&#39;m a Teacher
            </Link>
            <Link href="/student/tests" className="border-2 border-primary text-primary px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-primary hover:text-white">
              I&#39;m a Student
            </Link>
          </div>
        </div>
      </section>

      {/* Features for Teachers */}
      <section className="py-12 md:py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">For Teachers</h2>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white">Create and customize tests</h3>
                    <p className="text-gray-300 text-sm md:text-base">Build tests with various question types tailored to your curriculum</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white">Centralized dashboard</h3>
                    <p className="text-gray-300 text-sm md:text-base">Manage and organize all your tests in one convenient location</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-accent rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white">Automated grading (Coming Soon)</h3>
                    <p className="text-gray-300 text-sm md:text-base">Save time with automatic grading and performance analytics</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-8">
                <Link href="/teacher/dashboard" className="bg-primary text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-secondary text-sm md:text-base">
                  Get Started as Teacher
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 bg-gray-700 p-6 md:p-8 rounded-xl">
              <div className="text-center">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 md:w-12 md:h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-base md:text-lg font-semibold text-white">Teacher Dashboard</h4>
                <p className="text-gray-300 mt-2 text-sm md:text-base">Create, manage, and track all your tests</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features for Students */}
      <section className="py-12 md:py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-gray-700 p-6 md:p-8 rounded-xl">
              <div className="text-center">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 md:w-12 md:h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="text-base md:text-lg font-semibold text-white">Student Portal</h4>
                <p className="text-gray-300 mt-2 text-sm md:text-base">Take tests and track your progress</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">For Students</h2>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-accent rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white">Easy access to tests</h3>
                    <p className="text-gray-300 text-sm md:text-base">Quickly find and take tests assigned by your teachers</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-accent rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white">View test results</h3>
                    <p className="text-gray-300 text-sm md:text-base">Get immediate feedback on your performance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-accent rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white">Track your progress</h3>
                    <p className="text-gray-300 text-sm md:text-base">Monitor your improvement over time</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-8">
                <Link href="/student/tests" className="bg-accent text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-secondary text-sm md:text-base">
                  Start Taking Tests
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}