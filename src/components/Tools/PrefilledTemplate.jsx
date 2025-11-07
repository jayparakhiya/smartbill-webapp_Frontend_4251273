import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import InvoiceTable from "../common/InvoiceTable";
import { fetchBillingEntities } from "../../redux/feature/billingParties/billingEntityActions";
import { useDispatch, useSelector } from "react-redux";
import { saveInvoiceWithEmail } from "../../redux/feature/saveInvoice/action";

const PrefilledTemplate = ({ invoiceItems, setInvoiceItems, printInvoice }) => {
  const dispatch = useDispatch();
  const [billerData, setBillerData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [selectedBiller, setSelectedBiller] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const { billingEntities } = useSelector((state) => state.billingEntities);

  useEffect(() => {
    dispatch(fetchBillingEntities());
  }, [dispatch]);

  useEffect(() => {
    // Populate billerData and clientData from the provided dataset
    const transformedBillerData = billingEntities
      .filter((entity) => entity.entity_role === "billed_by")
      .map((entity, index) => ({
        id: index + 1,
        name: entity.company_name,
        address: `${entity.address_line1}, ${entity.city}, ${entity.state} - ${entity.postal_code}`,
        gstin: entity.gstin,
        phoneNumber: entity.phone_number, // Added phone number
        email: entity.email, // Added email
      }));

    const transformedClientData = billingEntities
      .filter((entity) => entity.entity_role === "billed_to")
      .map((entity, index) => ({
        id: index + 1,
        name: entity.company_name,
        address: `${entity.address_line1}, ${entity.city}, ${entity.state} - ${entity.postal_code}`,
        gstin: entity.gstin,
        phoneNumber: entity.phone_number, // Added phone number
        email: entity.email, // Added email
      }));

    setBillerData(transformedBillerData);
    setClientData(transformedClientData);
  }, [billingEntities]);

  const handleBillerChange = (e) => {
    const selected = billerData.find(
      (biller) => biller.id === parseInt(e.target.value)
    );
    setSelectedBiller(selected);
  };

  const handleClientChange = (e) => {
    const selected = clientData.find(
      (client) => client.id === parseInt(e.target.value)
    );
    setSelectedClient(selected);
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

    invoiceItems.forEach((item) => {
      const { invoiceQuantity, price, gst } = item;
      const itemTotal = invoiceQuantity * price;

      const itemGST = (itemTotal * (gst || (gst === 0 ? gst : 18))) / 100;

      totalAmount += itemTotal;
      totalGST += itemGST;
    });

    const cgst = totalGST / 2;
    const sgst = totalGST / 2;

    return { totalAmount, cgst, sgst, totalWithGST: totalAmount + totalGST };
  };

  const total = calculateTotal();

  const invoiceData = {
    biller: selectedBiller,
    client: selectedClient,
    items: invoiceItems.map((item) => ({
      name: item.name,
      hsnCode: item.hsnCode,
      gst: item.gst || 18,
      invoiceQuantity: item.invoiceQuantity,
      price: item.price,
      cgst: (item.invoiceQuantity * item.price * (item.gst || 18)) / 200,
      sgst: (item.invoiceQuantity * item.price * (item.gst || 18)) / 200,
      total:
        item.invoiceQuantity * item.price +
        (item.invoiceQuantity * item.price * (item.gst || 18)) / 100,
    })),
    subtotal: total.totalAmount,
    gst: {
      cgst: total.cgst,
      sgst: total.sgst,
    },
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
    doc.text(`Name: ${selectedBiller.name}`, leftX, currentY);
    currentY += lineSpacing;

    const wrappedBillerAddress = doc.splitTextToSize(
      selectedBiller.address,
      80
    );
    doc.text("Address:", leftX, currentY);
    currentY += lineSpacing; // Move down for wrapped content
    wrappedBillerAddress.forEach((line) => {
      doc.text(line, leftX, currentY); // Add indentation for wrapped lines
      currentY += lineSpacing; // Increment Y-coordinate for the next line
    });
    doc.text(`Phone: ${selectedBiller.phoneNumber}`, leftX, currentY); // Add phone number
    currentY += lineSpacing;
    doc.text(`Email: ${selectedBiller.email}`, leftX, currentY); // Add email
    currentY += lineSpacing;
    doc.text(`GSTIN: ${selectedBiller.gstin}`, leftX, currentY);

    // Right Section - Billed To
    let rightY = sectionStartY; // Reset Y for the right section
    const rightX = 110; // Starting X position for "Billed To"
    doc.setFontSize(12);
    doc.text("Billed To", rightX, rightY);
    rightY += lineSpacing;

    doc.setFontSize(10);
    doc.text(`Name: ${selectedClient.name}`, rightX, rightY);
    rightY += lineSpacing;

    const wrappedClientAddress = doc.splitTextToSize(
      selectedClient.address,
      80
    );
    doc.text("Address:", rightX, rightY);
    rightY += lineSpacing;
    wrappedClientAddress.forEach((line) => {
      doc.text(line, rightX, rightY); // Add indentation for wrapped lines
      rightY += lineSpacing; // Increment Y-coordinate for the next line
    });
    doc.text(`Phone: ${selectedClient.phoneNumber}`, rightX, rightY); // Add phone number
    rightY += lineSpacing;
    doc.text(`Email: ${selectedClient.email}`, rightX, rightY); // Add email
    rightY += lineSpacing;
    doc.text(`GSTIN: ${selectedClient.gstin}`, rightX, rightY);

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

      setInvoiceItems([]);
      setSelectedBiller(null);
      setSelectedClient(null);
    } catch (error) {
      console.error("Error generating or saving invoice:", error);
    }
  };

  console.log("invoiceData =====", invoiceData);
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Billed By and Billed To Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Billed By Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Billed By</h3>
          <select
            onChange={handleBillerChange}
            value={selectedBiller ? selectedBiller.id : ""}
            className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select Biller</option>
            {billerData.map((biller) => (
              <option key={biller.id} value={biller.id}>
                {biller.name}
              </option>
            ))}
          </select>
          {selectedBiller ? (
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                <strong>Name:</strong> {selectedBiller.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Address:</strong> {selectedBiller.address}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Phone:</strong> {selectedBiller.phoneNumber}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {selectedBiller.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>GSTIN:</strong> {selectedBiller.gstin}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Please select a biller.</p>
          )}
        </div>

        {/* Billed To Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Billed To</h3>
          <select
            onChange={handleClientChange}
            value={selectedClient ? selectedClient.id : ""}
            className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select Client</option>
            {clientData.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          {selectedClient ? (
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                <strong>Name:</strong> {selectedClient.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Address:</strong> {selectedClient.address}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Phone:</strong> {selectedClient.phoneNumber}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {selectedClient.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>GSTIN:</strong> {selectedClient.gstin}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Please select a client.</p>
          )}
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

export default PrefilledTemplate;
