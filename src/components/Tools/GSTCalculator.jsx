import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const GSTCalculator = () => {
  const [amount, setAmount] = useState("0");
  const [gstPercent, setGstPercent] = useState("5");
  const [taxType, setTaxType] = useState("exclusive");
  const navigate = useNavigate();

  if (amount < 0) setAmount(0);

  const gstOptions = [5, 12, 18, 28];
  const taxOptions = ["exclusive", "inclusive"];

  const { gstAmount, totalAmount, finalAmount } = useMemo(() => {
    const amt = parseFloat(amount);
    const gstRate = parseFloat(gstPercent) / 100;

    let gstAmount = 0;
    let totalAmount = 0;

    if (taxType === "exclusive") {
      gstAmount = amt * gstRate;
      totalAmount = amt + gstAmount;
    } else if (taxType === "inclusive") {
      gstAmount = amt - amt / (1 + gstRate);
      totalAmount = amt;
    }

    return {
      gstAmount,
      totalAmount,
      finalAmount: taxType === "exclusive" ? amt : amt - gstAmount,
    };
  }, [amount, gstPercent, taxType]);

  return (
    <div className="container mx-auto mt-10">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 text-blue-500 hover:text-blue-700 flex items-center"
      >
        &larr; Back to Dashboard
      </button>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold">GST Calculator</h1>
        <p className="mt-2 text-sm">
          Easily calculate GST for your business needs. Enter the details below
          to get precise results instantly.
        </p>
      </div>

      {/* Calculator Form */}
      <div className="p-6 shadow-lg bg-white rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Enter Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Amount Input */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          {/* GST Percent Dropdown */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              GST %
            </label>
            <select
              value={gstPercent}
              onChange={(e) => setGstPercent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            >
              {gstOptions.map((option) => (
                <option key={option} value={option}>
                  {option}%
                </option>
              ))}
            </select>
          </div>

          {/* Tax Type Dropdown */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Tax Type
            </label>
            <select
              value={taxType}
              onChange={(e) => setTaxType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            >
              {taxOptions.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Calculation Results */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Calculation Summary
          </h3>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Amount:</span>
            <span className="font-semibold text-gray-700">
              ₹{finalAmount ? finalAmount.toFixed(2) : "0.00"}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">GST Amount:</span>
            <span className="font-semibold text-gray-700">
              ₹{gstAmount ? gstAmount.toFixed(2) : "0.00"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Amount:</span>
            <span className="font-semibold text-gray-700">
              ₹{totalAmount ? totalAmount.toFixed(2) : "0.00"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GSTCalculator;
