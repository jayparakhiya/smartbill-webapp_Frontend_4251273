import React from "react";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="sticky top-0 z-50"></div>
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="sticky top-0 z-40 h-screen">
          <Sidebar />
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 bg-gray-100 shadow-inner overflow-y-auto">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
