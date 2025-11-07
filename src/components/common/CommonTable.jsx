import React from "react";

const CommonTable = ({
  data,
  columns,
  onEdit,
  onDelete,
  totalRows,
  rowsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  return (
    <div>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 text-left">#</th>
            {columns.map((column) => (
              <th
                key={column}
                className="py-2 px-4 bg-gray-200 text-gray-600 text-left"
              >
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="py-2 px-4 bg-gray-200 text-gray-600 text-left">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id} className="border-t">
              <td className="py-2 px-4">{index + 1}</td>
              {columns.map((column) => (
                <td key={column} className="py-2 px-4">
                  {item[column]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="py-2 px-4">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="text-yellow-500  py-1 px-2 "
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item._id)}
                      className="text-red-500 py-1 px-2  "
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="my-4 flex justify-between items-center">
        <div>
          <label htmlFor="rowsPerPage" className="mr-2 text-gray-700">
            Rows per page:
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="border border-gray-300 py-1 px-2 rounded-md"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
      </div>
      {onPageChange && totalPages > 1 && (
        <div className="flex justify-end">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => onPageChange(idx + 1)}
              className={`py-1 px-3 rounded-lg mx-1 ${
                currentPage === idx + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } hover:bg-blue-400 hover:text-white`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommonTable;
