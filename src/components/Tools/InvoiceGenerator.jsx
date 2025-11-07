import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts, fetchProducts } from "../../redux/feature/products/productActions";
import { toast } from "react-toastify";
import BlankTemplate from "./BlankTemplate";
import PrefilledTemplate from "./PrefilledTemplate";

const InvoiceGenerator = () => {
  const { templateType } = useParams(); // Capture template type from the route
  const dispatch = useDispatch();
  const invoiceRef = useRef();
  const { products = [], searchResults = [] } = useSelector((state) => state.products);

  // State for invoice items
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchProducts()); 
  }, [dispatch]);

  // Add product to invoice
  const addToInvoice = (product) => {
    if (!product.quantity || product.quantity === 0) {
      toast.error("Product is out of stock and cannot be added to the invoice");
      return;
    }

    const existingItem = invoiceItems.find((item) => item._id === product._id);
    if (existingItem) {
      toast.error("Product already added to the invoice");
      return;
    }

    // Add product to the invoice items state
    setInvoiceItems((prevItems) => [
      ...prevItems,
      { ...product, invoiceQuantity: 1 },
    ]);
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    dispatch(searchProducts(value));
  };

  const displayedProducts = query.trim() ? searchResults : products;

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Left Side: Product Search */}
      <div className="lg:w-1/3 w-full p-4 bg-white">
        <h2 className="text-xl font-semibold mb-4">Search Products</h2>
        <input
          type="search"
          placeholder="Search for products"
          value={query}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="search-results max-h-screen overflow-auto">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => addToInvoice(product)}
                className="cursor-pointer p-3 hover:bg-gray-100 rounded-lg flex items-center border-b last:border-b-0"
              >
                {/* <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded mr-3"
                /> */}
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    {product.description} ({product.quantity} available)
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">No Products Found</p>
          )}
        </div>
      </div>

      {/* Right Side: Dynamic Invoice Section */}
      <div
        className="lg:w-2/3 w-full p-6 bg-white overflow-hidden max-w-5xl mx-auto"
        ref={invoiceRef}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {templateType === "blank"
              ? "Blank Invoice Template"
              : "Prefilled Invoice Template"}
          </h1>
          <p className="text-gray-600">
            {templateType === "blank"
              ? "Start with a blank template and add products manually."
              : "Use prefilled product details to generate your invoice."}
          </p>
        </div>
        {templateType === "blank" ? (
          <BlankTemplate
            invoiceItems={invoiceItems}
            setInvoiceItems={setInvoiceItems}
          />
        ) : (
          <PrefilledTemplate
            invoiceItems={invoiceItems}
            setInvoiceItems={setInvoiceItems}
          />
        )}
      </div>
    </div>
  );
};

export default InvoiceGenerator;
