import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBillingEntities,
  addBillingEntity,
  deleteBillingEntity,
  updateBillingEntity,
} from "../redux/feature/billingParties/billingEntityActions";
import { VerifyGSTNumber } from "../redux/feature/verifyGST/verifyGSTaction";

const Billingparties = () => {
  const dispatch = useDispatch();
  const { billingEntities, loading, error } = useSelector(
    (state) => state.billingEntities
  );

  console.log("billingEntities =====", billingEntities);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entityRole, setEntityRole] = useState(null); // 'billed_by' or 'billed_to'
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    contact_person: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone_number: "",
    email: "",
    gstin: "",
    notes: "",
  });

  useEffect(() => {
    dispatch(fetchBillingEntities());
  }, [dispatch]);

  const openModal = (role, entity = null) => {
    setEntityRole(role);
    if (entity) {
      setEditMode(true);
      const {
        user_id,
        user,
        createdAt,
        updatedAt,
        entity_role,
        ...editableFields
      } = entity;
      setFormData({
        ...editableFields,
        _id: entity._id,
      });
    } else {
      setEditMode(false);
      setFormData({
        company_name: "",
        contact_person: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        phone_number: "",
        email: "",
        gstin: "",
        notes: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEntityRole(null);
    setEditMode(false);
    setFormData({
      company_name: "",
      contact_person: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      phone_number: "",
      email: "",
      gstin: "",
      notes: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const entityData = {
      ...formData,
      entity_role: entityRole,
    };

    if (editMode) {
      // Update existing entity
      dispatch(updateBillingEntity(formData._id, entityData))
        .then(() => closeModal())
        .catch(() => {
          console.error("Error updating entity");
        });
    } else {
      // Add new entity
      dispatch(addBillingEntity(entityData))
        .then(() => closeModal())
        .catch(() => {
          console.error("Error adding entity");
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this entity?")) {
      dispatch(deleteBillingEntity(id));
    }
  };

  const billedByEntities = billingEntities?.filter(
    (entity) => entity.entity_role === "billed_by"
  );
  const billedToEntities = billingEntities?.filter(
    (entity) => entity.entity_role === "billed_to"
  );

  const verifyGstin = async (gstNumber) => {
    if (!gstNumber) {
      console.error("GST number is empty!");
      return;
    }
    try {
      const result = await VerifyGSTNumber(gstNumber);
      console.log("GST Verification Result:", result);

      // Optional: Show a message or update the form state if necessary
      if (
        result?.success &&
        result?.data.enrichment_details.online_provider.details.status.value ===
          "Active"
      ) {
        console.log("GST number is valid.");
      } else {
        console.log("Invalid GST number.");
        alert("The entered GST number is invalid or cancelled!");
      }
    } catch (error) {
      console.error("Failed to verify GST number:", error);
      alert("An error occurred while verifying the GST number.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Billing Parties</h2>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => openModal("billed_by")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Billed By
        </button>
        <button
          onClick={() => openModal("billed_to")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Billed To
        </button>
      </div>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Billed By Section */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Billed By</h3>
          {loading ? (
            <p>Loading...</p>
          ) : billedByEntities.length === 0 ? (
            <p className="text-gray-500">No Billed By entities found.</p>
          ) : (
            <ul className="space-y-4">
              {billedByEntities.map((entity) => (
                <li
                  key={entity._id}
                  className="border p-4 rounded flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{entity.company_name}</p>
                    <p className="text-sm text-gray-600">
                      {entity.contact_person}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal("billed_by", entity)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entity._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Billed To Section */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Billed To</h3>
          {loading ? (
            <p>Loading...</p>
          ) : billedToEntities.length === 0 ? (
            <p className="text-gray-500">No Billed To entities found.</p>
          ) : (
            <ul className="space-y-4">
              {billedToEntities.map((entity) => (
                <li
                  key={entity._id}
                  className="border p-4 rounded flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{entity.company_name}</p>
                    <p className="text-sm text-gray-600">
                      {entity.contact_person}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal("billed_to", entity)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entity._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal for Adding/Editing Billing Entity */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-10 ">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {editMode
                ? `Edit ${
                    entityRole === "billed_by" ? "Billed By" : "Billed To"
                  }`
                : `Add ${
                    entityRole === "billed_by" ? "Billed By" : "Billed To"
                  }`}
            </h3>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-h-[500px] overflow-y-auto px-6 fleximg"
            >
              <div className="grid grid-cols-2 gap-6">
                {Object.keys(formData).map((field) => (
                  <div key={field} className="col-span-1">
                    <label className="block text-sm font-medium text-gray-600 capitalize mb-1">
                      {field.replace(/_/g, " ")}
                    </label>
                    {/* <input
                      required
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Enter ${field.replace(/_/g, " ")}`}
                    /> */}
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      onBlur={
                        field === "gstin"
                          ? () => verifyGstin(formData[field])
                          : undefined
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Enter ${field.replace(/_/g, " ")}`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200 shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200 shadow-sm"
                >
                  {editMode ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billingparties;
