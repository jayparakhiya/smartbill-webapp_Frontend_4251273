import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../utils/api";

export const saveInvoiceWithEmail = createAsyncThunk(
  "invoices/saveInvoiceWithEmail",
  async ({ invoiceData, pdfBlob }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("pdf", pdfBlob, "invoice.pdf"); // PDF attachment
    formData.append("invoiceData", JSON.stringify(invoiceData)); // Serialize invoiceData

    try {
      const response = await api.post("/save-invoice-with-email", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Invoice and email processed successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error saving invoice and sending email:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
