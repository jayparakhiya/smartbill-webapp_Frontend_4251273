import React from "react";
import { useNavigate } from "react-router-dom";

const TemplateSelection = () => {
  const navigate = useNavigate();

  const handleSelectTemplate = (templateType) => {
    // Navigate to the dynamic route based on the selected template
    navigate(`/dashboard/invoice-generator/${templateType}`);
  };

  return (
    <div className="template-selection p-8 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">
        Choose Your Invoice Template
      </h2>
      <p className="text-gray-600 mb-8 text-lg text-center max-w-lg">
        Select a template that best suits your invoicing needs. Whether you
        prefer a blank canvas or a prefilled layout, we've got you covered!
      </p>
      <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
        {/* Blank Template */}
        <div
          onClick={() => handleSelectTemplate("blank")}
          className="cursor-pointer p-6 bg-white border border-gray-300 shadow-md rounded-lg hover:shadow-lg hover:scale-105 transition transform duration-300"
        >
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
              📝
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Blank Template
            </h3>
            <p className="text-gray-600 text-center">
              Start from scratch with a clean template for full customization.
            </p>
          </div>
        </div>

        {/* Prefilled Template */}
        <div
          onClick={() => handleSelectTemplate("prefilled")}
          className="cursor-pointer p-6 bg-white border border-gray-300 shadow-md rounded-lg hover:shadow-lg hover:scale-105 transition transform duration-300"
        >
          <div className="flex flex-col items-center">
            <div className="bg-green-100 text-green-600 p-4 rounded-full mb-4">
              ✅
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Prefilled Template
            </h3>
            <p className="text-gray-600 text-center">
              Use a prefilled layout to save time and simplify your invoicing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
