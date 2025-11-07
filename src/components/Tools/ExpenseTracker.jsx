import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addExpense, fetchExpenses } from "../../redux/feature/expense/action";
import CommonTable from "../common/CommonTable";
import LoadingSpinner from "../common/LoadingSpinner";

const ExpenseTracker = () => {
  const [incoming, setIncoming] = useState("");
  const [outgoing, setOutgoing] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { expenses, loading, error } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const handleAddRecord = () => {
    const incomingAmount = parseFloat(incoming) || 0;
    const outgoingAmount = parseFloat(outgoing) || 0;
    const balance = incomingAmount - outgoingAmount;

    if (incomingAmount === 0 && outgoingAmount === 0) return;

    dispatch(
      addExpense({
        incoming: incomingAmount,
        outgoing: outgoingAmount,
        description: description,
        balance: balance,
      })
    );

    setIncoming("");
    setOutgoing("");
    setDescription("");
  };

  const totalIncoming = expenses.reduce(
    (total, record) => total + record.incoming,
    0
  );
  const totalOutgoing = expenses.reduce(
    (total, record) => total + record.outgoing,
    0
  );
  const totalBalance = totalIncoming - totalOutgoing;

  const columns = ["incoming", "outgoing", "balance", "description"];

  return (
    <div className="container mx-auto mt-10">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
        <p className="mt-2 text-sm">
          Manage your income and expenses easily and track your balance.
        </p>
      </div>

      {/* Input Form */}
      <div className="p-6 mt-6 shadow-lg bg-white rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Add New Record</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Incoming Money */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Incoming Money
            </label>
            <input
              type="number"
              value={incoming}
              onChange={(e) => setIncoming(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter incoming money"
            />
          </div>

          {/* Outgoing Money */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Outgoing Money
            </label>
            <input
              type="number"
              value={outgoing}
              onChange={(e) => setOutgoing(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter outgoing money"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-medium">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a description"
            rows="3"
          />
        </div>

        {/* Add Record Button */}
        <button
          onClick={handleAddRecord}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add Record
        </button>
      </div>

      {/* Error or Loading State */}
      {error && <p className="mt-4 text-red-500 text-center">Error: {error}</p>}
      {loading && <LoadingSpinner />}

      {/* Expense Records */}
      {!loading && expenses.length > 0 && (
        <div className="mt-6 shadow-lg bg-white rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Expense Records</h2>
          <CommonTable data={expenses} columns={columns} />
          {/* Summary */}
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between font-semibold">
              <span>Total Incoming:</span>
              <span>₹{totalIncoming.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total Outgoing:</span>
              <span>₹{totalOutgoing.toFixed(2)}</span>
            </div>
            <div
              className={`flex justify-between font-bold ${
                totalBalance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <span>Total Balance:</span>
              <span>₹{totalBalance.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* No Records */}
      {!loading && expenses.length === 0 && (
        <p className="mt-6 text-center text-gray-500">
          No expense records available. Add a new record to get started!
        </p>
      )}
    </div>
  );
};

export default ExpenseTracker;
