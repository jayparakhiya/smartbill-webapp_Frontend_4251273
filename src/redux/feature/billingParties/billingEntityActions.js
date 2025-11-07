// src/features/billingEntities/billingEntityActions.js

import api from "../../../../utils/api";
import {
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
} from "./billingEntitySlice";

// Fetch all Billing Entities
export const fetchBillingEntities = (role) => async (dispatch) => {
  try {
    dispatch(fetchBillingEntitiesStart());
    let endpoint = "/billing-entities";
    if (role) {
      endpoint += `?role=${role}`;
    }
    const response = await api.get(endpoint);
    dispatch(fetchBillingEntitiesSuccess(response.data));
  } catch (error) {
    dispatch(
      fetchBillingEntitiesFailure(
        error.response?.data?.message || "Failed to fetch billing entities"
      )
    );
  }
};

// Add a new Billing Entity
export const addBillingEntity = (billingEntity) => async (dispatch) => {
  try {
    dispatch(addBillingEntityStart());
    const response = await api.post("/billing-entities", billingEntity);
    dispatch(addBillingEntitySuccess(response.data));
  } catch (error) {
    dispatch(
      addBillingEntityFailure(
        error.response?.data?.message || "Failed to add billing entity"
      )
    );
  }
};

// Update a Billing Entity
export const updateBillingEntity = (id, billingEntity) => async (dispatch) => {
  try {
    dispatch(updateBillingEntityStart());
    const response = await api.put(`/billing-entities/${id}`, billingEntity);
    dispatch(updateBillingEntitySuccess(response.data));
  } catch (error) {
    dispatch(
      updateBillingEntityFailure(
        error.response?.data?.message || "Failed to update billing entity"
      )
    );
  }
};

// Delete a Billing Entity
export const deleteBillingEntity = (id) => async (dispatch) => {
  try {
    dispatch(deleteBillingEntityStart());
    await api.delete(`/billing-entities/${id}`);
    dispatch(deleteBillingEntitySuccess(id));
  } catch (error) {
    dispatch(
      deleteBillingEntityFailure(
        error.response?.data?.message || "Failed to delete billing entity"
      )
    );
  }
};

// Search Billing Entities
export const searchBillingEntities = (query, role) => async (dispatch) => {
  try {
    if (!query) {
      dispatch(clearSearchResults());
      return;
    }
    dispatch(searchBillingEntitiesStart());
    let endpoint = `/billing-entities/search?query=${query}`;
    if (role) {
      endpoint += `&role=${role}`;
    }
    const response = await api.get(endpoint);
    dispatch(searchBillingEntitiesSuccess(response.data));
  } catch (error) {
    dispatch(
      searchBillingEntitiesFailure(
        error.response?.data?.message || "Failed to search billing entities"
      )
    );
  }
};
