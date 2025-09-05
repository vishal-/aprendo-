export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">About Aprendo</h1>
      <div className="prose prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Our Mission
          </h2>
          <p className="text-gray-300 mb-4">
            Aprendo is designed to streamline the testing process for both
            teachers and students. Our goal is to provide a simple and efficient
            way for educators to create, manage, and grade tests, while offering
            students a straightforward and accessible way to take them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            For Teachers
          </h2>
          <ul className="text-gray-300 mb-4 space-y-2">
            <li>• Create and customize tests with various question types</li>
            <li>• Manage and organize your tests in a centralized dashboard</li>
            <li>• Automated grading and performance analytics (Coming soon)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            For Students
          </h2>
          <ul className="text-gray-300 mb-4 space-y-2">
            <li>• Easily access and take tests assigned by your teachers</li>
            <li>• View your test results and track your progress</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Our Vision</h2>
          <p className="text-gray-300 mb-4">
            We believe that education should be accessible, efficient, and
            engaging. Aprendo aims to bridge the gap between traditional testing
            methods and modern technology, making the assessment process
            seamless for both educators and learners.
          </p>
        </section>

        {/* <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
          <p className="text-gray-300">
            Have questions or feedback? We'd love to hear from you at hello@aprendo.com
          </p>
        </section> */}
      </div>
    </div>
  );
}
