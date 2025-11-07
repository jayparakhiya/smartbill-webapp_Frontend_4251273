import React from "react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen py-16 text-white">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <h1 className="text-5xl font-bold text-center mb-8">Contact Us</h1>
        <p className="text-lg text-center max-w-2xl mx-auto mb-12">
          Have any questions or need assistance? We're here to help. Reach out
          to us through the form below or connect via social media for updates
          and support.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Get in Touch Section */}
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-700">
              Get in Touch
            </h2>
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-center">
                <div className="bg-indigo-100 p-4 rounded-full mr-4">
                  <span className="material-icons text-indigo-600 text-3xl">
                    location_on
                  </span>
                </div>
                <div>
                  <p className="font-bold">Our Address</p>
                  <p className="text-gray-600">
                    123 Main Street, <br />
                    Cityville, Country
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center">
                <div className="bg-green-100 p-4 rounded-full mr-4">
                  <span className="material-icons text-green-600 text-3xl">
                    phone
                  </span>
                </div>
                <div>
                  <p className="font-bold">Phone</p>
                  <p className="text-gray-600">+1 234 567 890</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center">
                <div className="bg-red-100 p-4 rounded-full mr-4">
                  <span className="material-icons text-red-600 text-3xl">
                    email
                  </span>
                </div>
                <div>
                  <p className="font-bold">Email</p>
                  <p className="text-gray-600">contact@ingen.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-700">
              Send a Message
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Message</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows="5"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Follow Us Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Follow Us</h2>
          <p className="text-lg mb-6">
            Stay connected and follow us on social media for updates and more.
          </p>
          <div className="flex justify-center space-x-6">
            <Link
              to="#"
              className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f text-xl"></i>
            </Link>
            <Link
              to="#"
              className="bg-sky-400 text-white p-4 rounded-full hover:bg-sky-500 transition"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter text-xl"></i>
            </Link>
            <Link
              to="#"
              className="bg-pink-500 text-white p-4 rounded-full hover:bg-pink-600 transition"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram text-xl"></i>
            </Link>
            <Link
              to="#"
              className="bg-blue-800 text-white p-4 rounded-full hover:bg-blue-900 transition"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in text-xl"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
