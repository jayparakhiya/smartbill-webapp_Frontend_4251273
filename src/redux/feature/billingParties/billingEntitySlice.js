// src/features/billingEntities/billingEntitySlice.js

import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  billingEntities: [],
  searchResults: [],
  loading: false,
  error: null,
};

// Create the slice
const billingEntitySlice = createSlice({
  name: "billingEntities",
  initialState,
  reducers: {
    // Fetch Billing Entities
    fetchBillingEntitiesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBillingEntitiesSuccess(state, action) {
      state.loading = false;
      state.billingEntities = action.payload;
    },
    fetchBillingEntitiesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Add Billing Entity
    addBillingEntityStart(state) {
      state.loading = true;
      state.error = null;
    },
    addBillingEntitySuccess(state, action) {
      state.loading = false;
      state.billingEntities.push(action.payload);
    },
    addBillingEntityFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Billing Entity
    updateBillingEntityStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateBillingEntitySuccess(state, action) {
      state.loading = false;
      const index = state.billingEntities.findIndex(
        (entity) => entity._id === action.payload._id
      );
      if (index !== -1) {
        state.billingEntities[index] = action.payload;
      }
    },
    updateBillingEntityFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete Billing Entity
    deleteBillingEntityStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteBillingEntitySuccess(state, action) {
      state.loading = false;
      state.billingEntities = state.billingEntities.filter(
        (entity) => entity._id !== action.payload
      );
    },
    deleteBillingEntityFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Search Billing Entities
    searchBillingEntitiesStart(state) {
      state.loading = true;
      state.error = null;
    },
    searchBillingEntitiesSuccess(state, action) {
      state.loading = false;
      state.searchResults = action.payload;
    },
    searchBillingEntitiesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear Search Results
    clearSearchResults(state) {
      state.searchResults = [];
    },
  },
});

// Export actions
export const {
  fetchBillingEntitiesStart,
  fetchBillingEntitiesSuccess,
  fetchBillingEntitiesFailure,
  addBillingEntityStart,
  addBillingEntitySuccess,
  addBillingEntityFailure,
  updateBillingEntityStart,
  updateBillingEntitySuccess,
  updateBillingEntityFailure,
  deleteBillingEntityStart,
  deleteBillingEntitySuccess,
  deleteBillingEntityFailure,
  searchBillingEntitiesStart,
  searchBillingEntitiesSuccess,
  searchBillingEntitiesFailure,
  clearSearchResults,
} = billingEntitySlice.actions;

// Export reducer
export default billingEntitySlice;
