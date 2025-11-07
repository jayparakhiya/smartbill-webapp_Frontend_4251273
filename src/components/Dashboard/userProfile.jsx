import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/feature/auth/action';

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); 
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 hover:text-menuActive"
      >
        <span>Profile</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg">
          <Link to="/dashboard/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
          <Link to="/dashboard/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</Link>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
