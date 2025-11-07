import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "./feature/auth/authSlice";
import products from "./feature/products/productSlice";
import expenses from "./feature/expense/expenseSlice";
import billingEntities from "./feature/billingParties/billingEntitySlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Use the string key of the slice
};

const reducers = combineReducers({
  auth: auth.reducer, // Use the string key of the slice
  products: products.reducer,
  expenses: expenses.reducer,
  billingEntities: billingEntities.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const createStore = () => {
  return configureStore({
    reducer: persistedReducer,
    // devTools: process.env.NODE_ENV === "development",
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false,
        // thunk: true,
      });
    },
  });
};

export const store = createStore();
export const persistor = persistStore(store);
