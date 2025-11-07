import React from "react";
import { useNavigate } from "react-router-dom";

const PasswordChangeSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m-7 4a9 9 0 1112.727-7.268A9 9 0 019 21a9.003 9.003 0 01-7.268-12.727z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mt-6">
            Password Reset Successful!
          </h2>
          <p className="text-gray-600 mt-2">
            You can now use your new password to log in to your account.
          </p>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-200"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default PasswordChangeSuccess;
