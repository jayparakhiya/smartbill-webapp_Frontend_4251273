import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css'; // Import the custom CSS file


const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary text-textPrimary overflow-hidden">
      <div className="text-center">
        <div className="relative flex items-center justify-center font-bold text-9xl not-found-animation">
          <span className="text-buttonPrimary transform -translate-y-6 animate-bounce">4</span>
          <span className="relative flex items-center justify-center w-32 h-32 mx-4">
            <span className="absolute inset-0 border-8 rounded-full border-buttonSecondary glass-effect"></span>
          </span>
          <span className="text-buttonPrimary transform -translate-y-6 animate-bounce">4</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold">Page Not Found</h1>
        <p className="mt-2 text-lg">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="inline-block mt-4 text-lg text-buttonPrimary hover:underline hover:text-linkColor">
          Go back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;