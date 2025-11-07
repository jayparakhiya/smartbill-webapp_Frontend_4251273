import React from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoAddCircleOutline } from "react-icons/io5";

const InvoiceTable = ({
  invoiceItems,
  setInvoiceItems,
  handleQuantityChange,
  handleAddRow,
  handleDeleteRow,
  generatePDF,
  total,
}) => {
  return (
    <div>
      <table className="w-full border bg-white shadow-md rounded-lg mb-6">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2 border text-left">Item</th>
            <th className="p-2 border text-left">HSN/SAC</th>
            <th className="p-2 border text-left">GST (%)</th>
            <th className="p-2 border text-left">Quantity</th>
            <th className="p-2 border text-left">Rate</th>
            <th className="p-2 border text-left">Amount</th>
            <th className="p-2 border text-left">CGST</th>
            <th className="p-2 border text-left">SGST</th>
            <th className="p-2 border text-left">Total</th>
            <th className="p-2 border"></th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-2 border">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) =>
                    setInvoiceItems((prev) => {
                      const updated = [...prev];
                      updated[index].name = e.target.value;
                      return updated;
                    })
                  }
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="p-2 border">
                <input
                  type="text"
                  value={item.hsnCode}
                  onChange={(e) =>
                    setInvoiceItems((prev) => {
                      const updated = [...prev];
                      updated[index].hsnCode = e.target.value;
                      return updated;
                    })
                  }
                  className="w-24 p-1 border rounded"
                />
              </td>
              <td className="p-2 border">
                <select
                  value={item.gst || 18}
                  onChange={(e) =>
                    setInvoiceItems((prev) => {
                      const updated = [...prev];
                      updated[index].gst = parseInt(e.target.value, 10);
                      return updated;
                    })
                  }
                  className="w-full p-1 border rounded bg-white"
                >
                  <option value={5}>5%</option>
                  <option value={12}>12%</option>
                  <option value={18}>18%</option>
                  <option value={28}>28%</option>
                </select>
              </td>
              <td className="p-2 border">
                <input
                  type="number"
                  value={item.invoiceQuantity}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(index, parseInt(e.target.value, 10))
                  }
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td className="p-2 border">
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) =>
                    setInvoiceItems((prev) => {
                      const updated = [...prev];
                      updated[index].price = parseFloat(e.target.value) || 0;
                      return updated;
                    })
                  }
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td className="p-2 border">
                ₹{(item.invoiceQuantity * item.price).toFixed(2)}
              </td>
              <td className="p-2 border">
                ₹
                {(
                  (item.invoiceQuantity *
                    item.price *
                    (item.gst || (item.gst === 0 ? item.gst : 18))) /
                  200
                ).toFixed(2)}
              </td>
              <td className="p-2 border">
                ₹
                {(
                  (item.invoiceQuantity *
                    item.price *
                    (item.gst || (item.gst === 0 ? item.gst : 18))) /
                  200
                ).toFixed(2)}
              </td>
              <td className="p-2 border">
                ₹
                {(
                  item.invoiceQuantity * item.price +
                  (item.invoiceQuantity *
                    item.price *
                    (item.gst || (item.gst === 0 ? item.gst : 18))) /
                    100
                ).toFixed(2)}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDeleteRow(index)}
                  className="px-1 py-1 bg-red-500 text-white rounded-full transition"
                >
                  <HiOutlineTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mb-6">
        <button
          onClick={handleAddRow}
          className="px-4 py-2 flex items-center bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          <IoAddCircleOutline className="mr-2" />
          Add Item
        </button>
      </div>
      {/* Invoice Summary */}
      <div className="flex justify-end">
        <div className="w-1/3 bg-white shadow-md rounded-lg p-6">
          <p>Subtotal: ₹{total.totalAmount.toFixed(2)}</p>
          <p>CGST: ₹{total.cgst.toFixed(2)}</p>
          <p>SGST: ₹{total.sgst.toFixed(2)}</p>
          <p className="font-bold text-lg">
            Total: ₹{total.totalWithGST.toFixed(2)}
          </p>
        </div>
      </div>
      {/* Print Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={generatePDF}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoiceTable;
