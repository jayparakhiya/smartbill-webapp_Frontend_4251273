import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2">
            <h1 className="text-5xl font-extrabold mb-4">
              Welcome to <span className="text-yellow-400">InvoiceHuddle</span>
            </h1>
            <p className="text-lg mb-6">
              Collaborate, create, and streamline your invoicing process. Join
              the huddle and take control of your finances today!
            </p>
            <a
              href="/signup"
              className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md hover:bg-yellow-300 transition transform hover:scale-105 shadow-lg"
            >
              Get Started Now
            </a>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Invoice Huddle Hero"
              className="rounded-lg shadow-lg hover:scale-105 transition transform duration-300"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Why InvoiceHuddle?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Collaborative Invoicing"
              description="Work with your team seamlessly to create and manage invoices."
              icon="🤝"
              bg="from-green-400 to-blue-500"
            />
            <FeatureCard
              title="Custom Templates"
              description="Pick from beautifully designed templates and brand them your way."
              icon="🎨"
              bg="from-purple-400 to-pink-500"
            />
            <FeatureCard
              title="Insightful Analytics"
              description="Track payments, revenue, and growth with comprehensive dashboards."
              icon="📈"
              bg="from-yellow-400 to-orange-500"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            What Makes Us Stand Out?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Simplify Your Invoicing?
        </h2>
        <p className="text-lg mb-8">
          Take the leap with InvoiceHuddle and transform how you manage your
          business finances.
        </p>
        <Link
          to="/signup"
          className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-md hover:bg-yellow-300 transition transform hover:scale-105 shadow-lg text-xl font-bold"
        >
          Join the Huddle Today
        </Link>
      </section>
    </div>
  );
};

const FeatureCard = ({ title, description, icon, bg }) => (
  <div
    className={`p-6 rounded-lg text-center text-white bg-gradient-to-r ${bg} hover:shadow-xl transition transform hover:scale-105 duration-300`}
  >
    <div className="text-6xl mb-4">{icon}</div>
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="text-white">{description}</p>
  </div>
);

const BenefitCard = ({ icon, title, description }) => (
  <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 duration-300">
    <div className="text-5xl text-blue-500 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TestimonialCard = ({ name, feedback, image }) => (
  <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 duration-300">
    <img
      src={image}
      alt={name}
      className="w-16 h-16 rounded-full mx-auto mb-4 hover:scale-110 transition transform duration-300"
    />
    <p className="text-gray-600 italic mb-4">"{feedback}"</p>
    <h4 className="text-lg font-bold">{name}</h4>
  </div>
);

const benefits = [
  {
    icon: "⚡",
    title: "Fast Performance",
    description: "Super-fast loading times and seamless invoicing experience.",
  },
  {
    icon: "🔒",
    title: "Rock-Solid Security",
    description: "Your data is protected with industry-standard encryption.",
  },
  {
    icon: "🌎",
    title: "Global Accessibility",
    description: "Invoice from anywhere, at any time, on any device.",
  },
];

const testimonials = [
  {
    name: "Alice Johnson",
    feedback: "InvoiceHuddle has made invoicing a breeze for my business!",
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Mark Williams",
    feedback:
      "The collaborative features are a game-changer. Highly recommended!",
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Sophia Lee",
    feedback:
      "Elegant design and fantastic features. The analytics are spot on!",
    image: "https://via.placeholder.com/100",
  },
];

export default Home;
