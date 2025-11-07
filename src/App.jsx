import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Layouts
import MainLayout from "./layout/mainlayout/MainLayout";
import DashboardLayout from "./layout/dashboardlayout/DashboardLayout";

// Public Components
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

// Protected Components
import DashboardHome from "./components/Dashboard/DashboardHome";
import Profile from "./components/Dashboard/Profile";

// Route Components
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import GSTCalculator from "./components/Tools/GSTCalculator";
import InvoiceGenerator from "./components/Tools/InvoiceGenerator";
import FundManagement from "./components/Tools/FundManagement";
import ExpenseTracker from "./components/Tools/ExpenseTracker";
import Settings from "./components/Dashboard/Settings";
import Features from "./components/Features";
import About from "./components/About";
import ManageInventory from "./components/ManageInventory/ManageInventory";
import AddProduct from "./components/ManageInventory/AddProduct";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import TemplateSelection from "./components/Tools/TemplateSelection";
import ContactUs from "./components/ContactUs";
import Billingparties from "./components/Billingparties";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <MainLayout />
              </PublicRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="features" element={<Features />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="gst-calculator" element={<GSTCalculator />} />
            <Route path="billing-parties" element={<Billingparties />} />

            <Route path="invoice-generator" element={<TemplateSelection />} />
            <Route
              path="invoice-generator/:templateType"
              element={<InvoiceGenerator />}
            />
            <Route path="fund-management" element={<FundManagement />} />
            <Route path="expense-tracker" element={<ExpenseTracker />} />
            <Route path="manage-inventory" element={<ManageInventory />} />
            <Route
              path="manage-inventory/add-product"
              element={<AddProduct />}
            />

            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
};

export default App;
