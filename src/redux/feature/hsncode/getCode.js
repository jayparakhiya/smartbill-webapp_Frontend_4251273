import api from "../../../../utils/api";

export const fetchHsnCode = async (query) => {
  try {
    const response = await api.get(`/hsn?HSN_CD=${query}`);
    console.log('response =====',response);
    return response.data;
  } catch (error) {
    console.error("Error fetching HSN suggestions:", error);
  }
};
