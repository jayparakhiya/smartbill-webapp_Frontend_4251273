import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  searchResults: [],
  invoiceItems: [],
  bulkUpload: { loading: false, success: false, error: null },
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    addProductSuccess(state, action) {
      state.loading = false;
      state.products.push(action.payload);
    },
    addProductFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateProductSuccess(state, action) {
      state.loading = false;
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      state.products[index] = action.payload;
    },
    updateProductFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccess(state, action) {
      state.loading = false;
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    deleteProductFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    searchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    searchProductsSuccess(state, action) {
      state.loading = false;
      state.searchResults = action.payload;
    },
    searchProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearSearchResults(state) {
      state.searchResults = [];
    },
    addInvoiceItem(state, action) {
      state.invoiceItems.push(action.payload);
    },
    updateInvoiceItem(state, action) {
      const { index, quantity } = action.payload;
      state.invoiceItems[index].invoiceQuantity = quantity;
    },
    clearInvoiceItems(state) {
      state.invoiceItems = [];
    },
    updateDynamicFieldStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateDynamicFieldSuccess(state, action) {
      state.loading = false;
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    updateDynamicFieldFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    bulkUploadStart(state) {
      state.bulkUpload.loading = true;
      state.bulkUpload.success = false;
      state.bulkUpload.error = null;
    },
    bulkUploadSuccess(state) {
      state.bulkUpload.loading = false;
      state.bulkUpload.success = true;
    },
    bulkUploadFailure(state, action) {
      state.bulkUpload.loading = false;
      state.bulkUpload.success = false;
      state.bulkUpload.error = action.payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  searchProductsStart,
  searchProductsSuccess,
  searchProductsFailure,
  clearSearchResults,
  addInvoiceItem,
  updateInvoiceItem,
  clearInvoiceItems,
  updateDynamicFieldStart,
  updateDynamicFieldSuccess,
  updateDynamicFieldFailure,
  bulkUploadStart,
  bulkUploadSuccess,
  bulkUploadFailure,
} = productSlice.actions;

export default productSlice;
