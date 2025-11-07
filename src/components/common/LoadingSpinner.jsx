import React from 'react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin border-t-4 border-blue-500 border-solid w-12 h-12 rounded-full"></div>
  </div>
);

export default LoadingSpinner;