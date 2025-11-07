import { addExpenseFailure, addExpenseStart, addExpenseSuccess, fetchExpensesFailure, fetchExpensesStart, fetchExpensesSuccess } from './expenseSlice';
import api from '../../../../utils/api';

export const fetchExpenses = () => async (dispatch) => {
    try {
      dispatch(fetchExpensesStart());
      const response = await api.get("/expenses/all");
      dispatch(fetchExpensesSuccess(response.data));
    } catch (error) {
      dispatch(
        fetchExpensesFailure(
          error.response?.data?.message || "Failed to fetch expenses"
        )
      );
    }
  };


  export const addExpense = (expense) => async (dispatch) => {
    try {
      dispatch(addExpenseStart());
      const response = await api.post("/expenses/add", expense);
      dispatch(addExpenseSuccess(response.data));
    } catch (error) {
      dispatch(
        addExpenseFailure(
          error.response?.data?.message || "Failed to add expense"
        )
      );
    }
  };