import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoAddCircleOutline } from "react-icons/io5";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import InvoiceTable from "../common/InvoiceTable";
import { useDispatch } from "react-redux";
import { saveInvoiceWithEmail } from "../../redux/feature/saveInvoice/action";

// Helper function for rendering input fields
const InputField = ({ name, placeholder, value, onChange, type = "text" }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full mb-4 p-2 border rounded-lg"
  />
);

const BlankTemplate = ({ invoiceItems, setInvoiceItems }) => {
  const dispatch = useDispatch();
  const [billerData, setBillerData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    gstin: "",
  });
  const [clientData, setClientData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    gstin: "",
  });

  const handleInputChange = (e, setData) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index].invoiceQuantity = newQuantity;
    setInvoiceItems(updatedItems);
  };

  const handleAddRow = () => {
    setInvoiceItems([
      ...invoiceItems,
      { name: "", hsnCode: "", invoiceQuantity: 0, price: 0, gst: 18 },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedItems = invoiceItems.filter((_, i) => i !== index);
    setInvoiceItems(updatedItems);
  };

  const calculateTotal = () => {
    let totalAmount = 0;
    let totalGST = 0;

    invoiceItems.forEach(({ invoiceQuantity, price, gst }) => {
      const itemTotal = invoiceQuantity * price;
      const itemGST = (itemTotal * (gst || 18)) / 100;

      totalAmount += itemTotal;
      totalGST += itemGST;
    });

    return {
      totalAmount,
      cgst: totalGST / 2,
      sgst: totalGST / 2,
      totalWithGST: totalAmount + totalGST,
    };
  };

  const total = calculateTotal();

  const invoiceData = {
    biller: billerData,
    client: clientData,
    items: invoiceItems.map(
      ({ name, hsnCode, gst, invoiceQuantity, price }) => ({
        name,
        hsnCode,
        gst: gst || 18,
        invoiceQuantity,
        price,
        cgst: (invoiceQuantity * price * (gst || 18)) / 200,
        sgst: (invoiceQuantity * price * (gst || 18)) / 200,
        total:
          invoiceQuantity * price +
          (invoiceQuantity * price * (gst || 18)) / 100,
      })
    ),
    subtotal: total.totalAmount,
    gst: { cgst: total.cgst, sgst: total.sgst },
    total: total.totalWithGST,
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    const lineSpacing = 6; // Line spacing for consistency
    const sectionStartY = 50; // Y-coordinate where both sections start

    // Header Section - Add Logo and Title
    doc.setFillColor(22, 160, 133);
    doc.rect(10, 10, 190, 20, "F");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text("Invoice", 14, 25);

    // Print Date
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Date: ${currentDate}`, 160, 40);

    // Left Section - Billed By
    let currentY = sectionStartY;
    const leftX = 14; // Starting X position for "Billed By"
    doc.setFontSize(12);
    doc.text("Billed By", leftX, currentY);
    currentY += lineSpacing;

    doc.setFontSize(10);
    doc.text(`Name: ${billerData.name}`, leftX, currentY);
    currentY += lineSpacing;

    const wrappedBillerAddress = doc.splitTextToSize(billerData.address, 80);
    doc.text("Address:", leftX, currentY);
    currentY += lineSpacing; // Move down for wrapped content
    wrappedBillerAddress.forEach((line) => {
      doc.text(line, leftX, currentY); // Add indentation for wrapped lines
      currentY += lineSpacing; // Increment Y-coordinate for the next line
    });
    doc.text(`Phone: ${billerData.phoneNumber}`, leftX, currentY); // Add phone number
    currentY += lineSpacing;
    doc.text(`Email: ${billerData.email}`, leftX, currentY); // Add email
    currentY += lineSpacing;
    doc.text(`GSTIN: ${billerData.gstin}`, leftX, currentY);

    // Right Section - Billed To
    let rightY = sectionStartY; // Reset Y for the right section
    const rightX = 110; // Starting X position for "Billed To"
    doc.setFontSize(12);
    doc.text("Billed To", rightX, rightY);
    rightY += lineSpacing;

    doc.setFontSize(10);
    doc.text(`Name: ${clientData.name}`, rightX, rightY);
    rightY += lineSpacing;

    const wrappedClientAddress = doc.splitTextToSize(clientData.address, 80);
    doc.text("Address:", rightX, rightY);
    rightY += lineSpacing;
    wrappedClientAddress.forEach((line) => {
      doc.text(line, rightX, rightY); // Add indentation for wrapped lines
      rightY += lineSpacing; // Increment Y-coordinate for the next line
    });
    doc.text(`Phone: ${clientData.phoneNumber}`, rightX, rightY); // Add phone number
    rightY += lineSpacing;
    doc.text(`Email: ${clientData.email}`, rightX, rightY); // Add email
    rightY += lineSpacing;
    doc.text(`GSTIN: ${clientData.gstin}`, rightX, rightY);

    // Line Break after sections
    const lineY = Math.max(currentY, rightY) + 10;
    doc.setDrawColor(160, 160, 160);
    doc.line(10, lineY, 200, lineY);

    currentY = lineY + lineSpacing;

    // Table Section
    doc.autoTable({
      startY: currentY,
      head: [
        [
          "Item",
          "HSN/SAC",
          "GST %",
          "Qty",
          "Rate",
          "Amt",
          "CGST",
          "SGST",
          "Total",
        ],
      ],
      body: invoiceItems.map((item) => [
        item.name,
        item.hsnCode,
        item.gst || 18,
        item.invoiceQuantity,
        item.price.toFixed(2),
        (item.invoiceQuantity * item.price).toFixed(2),
        ((item.invoiceQuantity * item.price * (item.gst || 18)) / 200).toFixed(
          2
        ),
        ((item.invoiceQuantity * item.price * (item.gst || 18)) / 200).toFixed(
          2
        ),
        (
          item.invoiceQuantity * item.price +
          (item.invoiceQuantity * item.price * (item.gst || 18)) / 100
        ).toFixed(2),
      ]),
      theme: "",
      headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
      bodyStyles: { textColor: [0, 0, 0], lineColor: [160, 160, 160] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { top: 10 },
    });
    currentY = doc.autoTable.previous.finalY + 10;

    // Footer Section
    doc.setFontSize(12);
    doc.text(
      `Subtotal: ₹${total.totalAmount.toFixed(2)}`,
      14,
      currentY + lineSpacing
    );
    doc.text(`CGST: ₹${total.cgst.toFixed(2)}`, 14, currentY + lineSpacing * 2);
    doc.text(`SGST: ₹${total.sgst.toFixed(2)}`, 14, currentY + lineSpacing * 3);

    doc.setFontSize(14);
    doc.setTextColor(22, 160, 133);
    doc.text(
      `Grand Total: ₹${total.totalWithGST.toFixed(2)}`,
      14,
      currentY + lineSpacing * 5
    );

    try {
      const pdfBlob = doc.output("blob");

      doc.autoPrint();
      doc.output("dataurlnewwindow");
      doc.save("invoice.pdf");

      // Save invoice in the database
            dispatch(saveInvoiceWithEmail({ invoiceData, pdfBlob }));
      

      setBillerData({ name: "", address: "", phone: "", email: "", gstin: "" });
      setClientData({ name: "", address: "", phone: "", email: "", gstin: "" });
      setInvoiceItems([]);
    } catch (error) {
      console.error("Error generating or saving invoice:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Billed By</h3>
          <InputField
            name="name"
            placeholder="Biller Name"
            value={billerData.name}
            onChange={(e) => handleInputChange(e, setBillerData)}
          />
          <textarea
            name="address"
            placeholder="Biller Address"
            value={billerData.address}
            onChange={(e) => handleInputChange(e, setBillerData)}
            className="w-full mb-4 p-2 border rounded-lg"
          ></textarea>
          <InputField
            name="phone"
            placeholder="Phone"
            value={billerData.phone}
            onChange={(e) => handleInputChange(e, setBillerData)}
          />
          <InputField
            name="email"
            placeholder="Email"
            value={billerData.email}
            onChange={(e) => handleInputChange(e, setBillerData)}
            type="email"
          />
          <InputField
            name="gstin"
            placeholder="GSTIN"
            value={billerData.gstin}
            onChange={(e) => handleInputChange(e, setBillerData)}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Billed To</h3>
          <InputField
            name="name"
            placeholder="Client Name"
            value={clientData.name}
            onChange={(e) => handleInputChange(e, setClientData)}
          />
          <textarea
            name="address"
            placeholder="Client Address"
            value={clientData.address}
            onChange={(e) => handleInputChange(e, setClientData)}
            className="w-full mb-4 p-2 border rounded-lg"
          ></textarea>
          <InputField
            name="phone"
            placeholder="Phone"
            value={clientData.phone}
            onChange={(e) => handleInputChange(e, setClientData)}
          />
          <InputField
            name="email"
            placeholder="Email"
            value={clientData.email}
            onChange={(e) => handleInputChange(e, setClientData)}
            type="email"
          />
          <InputField
            name="gstin"
            placeholder="GSTIN"
            value={clientData.gstin}
            onChange={(e) => handleInputChange(e, setClientData)}
          />
        </div>
      </div>

      <InvoiceTable
        invoiceItems={invoiceItems}
        setInvoiceItems={setInvoiceItems}
        handleQuantityChange={handleQuantityChange}
        handleAddRow={handleAddRow}
        handleDeleteRow={handleDeleteRow}
        generatePDF={generatePDF}
        total={total}
      />
    </div>
  );
};

export default BlankTemplate;
