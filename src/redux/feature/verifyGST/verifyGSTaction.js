import api from "../../../../utils/api";

export const VerifyGSTNumber = async (gstNumber) => {
  try {
    const response = await api.get(`/verify-gst/${gstNumber}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching HSN suggestions:", error);
  }
};
