import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    fetchExpensesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchExpensesSuccess(state, action) {
      state.loading = false;
      state.expenses = action.payload;
    },
    fetchExpensesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addExpenseStart(state) {
      state.loading = true;
      state.error = null;
    },
    addExpenseSuccess(state, action) {
      state.loading = false;
      state.expenses.push(action.payload);
    },
    addExpenseFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchExpensesStart,
  fetchExpensesSuccess,
  fetchExpensesFailure,
  addExpenseStart,
  addExpenseSuccess,
  addExpenseFailure,
} = expenseSlice.actions;

export default expenseSlice;
