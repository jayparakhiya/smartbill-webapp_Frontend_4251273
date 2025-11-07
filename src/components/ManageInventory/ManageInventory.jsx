import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  bulkUploadProducts,
} from "../../redux/feature/products/productActions";
import { useNavigate } from "react-router-dom";
import CommonTable from "../common/CommonTable";
import ConfirmationModal from "../common/ConfirmationModal";
import LoadingSpinner from "../common/LoadingSpinner";
import * as XLSX from "xlsx";

const ManageInventory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const loadProducts = () => {
      try {
        dispatch(fetchProducts());
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
      setIsLoading(false);
    };

    loadProducts();
  }, [dispatch]);

  const handleDelete = (id) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedProductId) {
      dispatch(deleteProduct(selectedProductId));
      setSelectedProductId(null);
    }
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setSelectedProductId(null);
    setIsModalOpen(false);
  };

  const handleEdit = (product) => {
    navigate("/dashboard/manage-inventory/add-product", { state: { product } });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        handleBulkUpload(sheetData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleBulkUpload = async (productsFromFile) => {
    if (productsFromFile.length) {
      const processedProducts = productsFromFile.map((product) => {
        const dynamicFields = {};

        Object.keys(product).forEach((key) => {
          if (
            key !== "name" &&
            key !== "description" &&
            key !== "hsnCode" &&
            key !== "gst" &&
            key !== "price" &&
            key !== "quantity"
          ) {
            dynamicFields[key] = product[key];
          }
        });

        return {
          name: product.name,
          description: product.description,
          hsnCode: product.hsnCode,
          gst: product.gst,
          price: product.price,
          quantity: product.quantity,
          dynamicFields: dynamicFields,
        };
      });

      await dispatch(bulkUploadProducts(processedProducts));
      dispatch(fetchProducts());
    } else {
      alert("No products to upload");
    }
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = products.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowsChange = (value) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

  const columns = ["name", "description", "price", "quantity"];

  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-500 hover:text-blue-700 underline"
      >
        Back
      </button>
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">Manage Inventory</h1>
          <p className="text-gray-500 text-sm">
            To Download Sample Inventory File Please,
            <a
              href="https://docs.google.com/spreadsheets/d/1NjmHZEMnHE3FDMWRravH-pT1ipovolPpq6ySEjFKa3E/export?format=xlsx"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Click Here
            </a>
          </p>
        </div>

        <div className="space-x-4">
          <button
            type="button"
            onClick={() => document.getElementById("file-upload").click()}
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg focus:outline-none"
          >
            Upload Bulk Products
          </button>

          {/* Hidden File Input */}
          <input
            id="file-upload"
            type="file"
            accept=".xlsx, .csv"
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            onClick={() => navigate("/dashboard/manage-inventory/add-product")}
            className="border border-blue-500 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Add Product
          </button>
        </div>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {error && <p className="text-red-500">Error: {error}</p>}

          <CommonTable
            data={currentRows}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            totalRows={products.length}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageChange={paginate}
            onRowsPerPageChange={handleRowsChange}
          />
        </>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
};

export default ManageInventory;
