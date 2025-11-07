import api from "../../../../utils/api";
import {
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
  updateDynamicFieldStart,
  updateDynamicFieldSuccess,
  updateDynamicFieldFailure,
  bulkUploadStart,
  bulkUploadSuccess,
  bulkUploadFailure,
} from "./productSlice";

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());
    const response = await api.get("/products/all");
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    dispatch(
      fetchProductsFailure(
        error.response?.data?.message || "Failed to fetch products"
      )
    );
  }
};

export const addProduct = (product) => async (dispatch) => {
  try {
    dispatch(addProductStart());
    const response = await api.post("/products/add", product);
    dispatch(addProductSuccess(response.data));
  } catch (error) {
    dispatch(
      addProductFailure(
        error.response?.data?.message || "Failed to add product"
      )
    );
  }
};

export const bulkUploadProducts = (products) => async (dispatch) => {
  try {
    dispatch(bulkUploadStart());
    const response = await api.post("/products/bulk-add", {
      products: products,
    });
    dispatch(bulkUploadSuccess(response.data));
  } catch (error) {
    dispatch(
      bulkUploadFailure(
        error.response?.data?.message || "Failed to upload products"
      )
    );
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  try {
    dispatch(updateProductStart());
    const response = await api.put(`/products/${id}`, product);
    dispatch(updateProductSuccess(response.data));
  } catch (error) {
    dispatch(
      updateProductFailure(
        error.response?.data?.message || "Failed to update product"
      )
    );
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductStart());
    await api.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(
      deleteProductFailure(
        error.response?.data?.message || "Failed to delete product"
      )
    );
  }
};

export const searchProducts = (query) => async (dispatch) => {
  try {
    console.log("query ===== ", query);
    if (!query) {
      console.log("notquery ===== ", query);
      dispatch(clearSearchResults());
      return;
    }
    console.log("query ===== ", query);
    dispatch(searchProductsStart());
    const response = await api.get(`/products/search?query=${query}`);
    dispatch(searchProductsSuccess(response.data));
  } catch (error) {
    dispatch(
      searchProductsFailure(
        error.response?.data?.message || "Failed to search products"
      )
    );
  }
};
export const addDynamicField =
  (productId, fieldName, fieldValue) => async (dispatch) => {
    try {
      dispatch(updateDynamicFieldStart());
      const response = await api.put(`/products/dynamic-field/${productId}`, {
        fieldName,
        fieldValue,
      });
      dispatch(updateDynamicFieldSuccess(response.data)); // Pass updated product
    } catch (error) {
      dispatch(
        updateDynamicFieldFailure(
          error.response?.data?.message || "Failed to add/update dynamic field"
        )
      );
    }
  };
