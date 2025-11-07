import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addProduct,
  updateProduct,
} from "../../redux/feature/products/productActions";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchHsnCode } from "../../redux/feature/hsncode/getCode";


const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    hsnCode: "", 
    gst:""
  });
  const [dynamicFields, setDynamicFields] = useState({});
  const [editingProductId, setEditingProductId] = useState(null);
  const [hsnSuggestions, setHsnSuggestions] = useState([]); // HSN suggestions from API

  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");

  useEffect(() => {
    if (location.state && location.state.product) {
      setProduct(location.state.product);
      setDynamicFields(location.state.product.dynamicFields || {});
      setEditingProductId(location.state.product._id);
    }
  }, [location.state]);

  // Handle changes in the input fields
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    if (name === "hsnCode" && value.length >= 3) {
      const result = await fetchHsnCode(value);
      setHsnSuggestions(result);
    } else if (name === "hsnCode") {
      setHsnSuggestions([]);
    }
  };

  const handleAddDynamicField = () => {
    if (newFieldName) {
      setDynamicFields((prevFields) => ({
        ...prevFields,
        [newFieldName]: newFieldValue,
      }));
      setNewFieldName("");
      setNewFieldValue("");
    }
  };

  const handleDynamicFieldChange = (fieldName, newFieldName, newValue) => {
    setDynamicFields((prevFields) => {
      const updatedFields = { ...prevFields };
      delete updatedFields[fieldName];
      updatedFields[newFieldName] = newValue; 
      return updatedFields;
    });
  };

  const handleRemoveDynamicField = (fieldName) => {
    setDynamicFields((prevFields) => {
      const updatedFields = { ...prevFields };
      delete updatedFields[fieldName];
      return updatedFields;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      dynamicFields,
    };

    if (editingProductId) {
      dispatch(updateProduct(editingProductId, updatedProduct));
    } else {
      dispatch(addProduct(updatedProduct));
    }
    navigate("/dashboard/manage-inventory");
  };

  // Handle HSN suggestion selection
  const handleHsnSelect = (hsnCode) => {
    setProduct({ ...product, hsnCode });
    setHsnSuggestions([]);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-gray-50 rounded-lg shadow-lg">
      <button
        onClick={() => navigate("/dashboard/manage-inventory")}
        className="mb-4 text-blue-500 hover:text-blue-700 underline"
      >
        Back
      </button>
      <h1 className="text-2xl font-semibold mb-6">
        {editingProductId ? "Edit Product" : "Add Product"}
      </h1>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium">HSN Code</label>
          <input
            type="text"
            name="hsnCode"
            value={product.hsnCode}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            {hsnSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-48 overflow-auto">
                {hsnSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.HSN_CD}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleHsnSelect(suggestion.HSN_CD)}
                  >
                    <b>{suggestion.HSN_CD}</b>
                    <span className="ml-2">- {suggestion.HSN_Description}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">GST Percentage</label>
          <select
            name="gst"
            value={product.gst}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select GST</option>
            <option value="5">5%</option>
            <option value="12">12%</option>
            <option value="18">18%</option>
            <option value="28">28%</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dynamic Fields */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Dynamic Fields</h2>
          <div className="space-y-2">
            {Object.entries(dynamicFields).map(([fieldName, value]) => (
              <div key={fieldName} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={fieldName}
                  onChange={(e) =>
                    handleDynamicFieldChange(fieldName, e.target.value, value)
                  }
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleDynamicFieldChange(
                      fieldName,
                      fieldName,
                      e.target.value
                    )
                  }
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveDynamicField(fieldName)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Field Name"
              value={newFieldName}
              onChange={(e) => setNewFieldName(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Field Value"
              value={newFieldValue}
              onChange={(e) => setNewFieldValue(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddDynamicField}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Add Field
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          {editingProductId ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
