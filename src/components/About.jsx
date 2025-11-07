import React from "react";

const About = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen py-16">
      <div className="container mx-auto px-6 text-white">
        {/* Header Section */}
        <h1 className="text-5xl font-extrabold text-center mb-6">About Us</h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-12">
          At <strong>InGen</strong>, we empower small businesses and freelancers
          with the tools they need to simplify and enhance their invoicing
          processes. Whether you're managing products, creating detailed
          invoices, or tracking expenses, our platform is tailored to save you
          time, reduce complexity, and maximize your business potential.
        </p>

        {/* Core Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Innovation */}
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <span className="material-icons text-blue-500 text-4xl">
                lightbulb
              </span>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">
              Innovation at the Core
            </h3>
            <p className="text-center">
              We constantly innovate to provide you with cutting-edge features
              that make invoicing seamless and efficient.
            </p>
          </div>

          {/* Simplicity */}
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <span className="material-icons text-green-500 text-4xl">
                build_circle
              </span>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">
              Simplicity at Its Best
            </h3>
            <p className="text-center">
              Our user-friendly tools and interfaces are designed to help you
              manage invoicing effortlessly.
            </p>
          </div>

          {/* Support */}
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <span className="material-icons text-red-500 text-4xl">
                support_agent
              </span>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">
              Exceptional Support
            </h3>
            <p className="text-center">
              Our dedicated team is always ready to assist you and ensure your
              success every step of the way.
            </p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Simplify Your Invoicing?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-6">
            Join thousands of businesses and freelancers who trust InGen for
            their invoicing needs. Experience the simplicity and efficiency of
            our platform today!
          </p>
          <button className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
