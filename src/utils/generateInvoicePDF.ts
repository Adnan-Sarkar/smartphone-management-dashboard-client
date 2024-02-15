import { jsPDF } from "jspdf";

export const generateInvoicePDF = (
  buyerName: string,
  sellDate: string,
  productName: string,
  quantity: number,
  price: number
) => {
  const pdf = new jsPDF();

  // Set font size and style
  pdf.setFontSize(10);

  // Company Name
  pdf.setFontSize(16);
  pdf.text("Company Name", 14, 15);

  // Company address
  pdf.setFontSize(11);
  pdf.text("company address", 14, 22);

  // Company contact number
  pdf.setFontSize(11);
  pdf.text("company contact number", 14, 27);

  // Buyer Name and Sell Date
  pdf.setFontSize(10);
  pdf.text(`Buyer Name: ${buyerName}`, 14, 40);
  pdf.text(`Date: ${sellDate}`, 14, 45);

  // Table header
  pdf.setFillColor(200, 200, 200);
  pdf.rect(14, 60, 180, 10, "F");
  pdf.setTextColor(0, 0, 0);
  pdf.text("Product Name", 20, 66);
  pdf.text("Quantity", 100, 66);
  pdf.text("Price", 130, 66);
  pdf.text("Total", 160, 66);

  // Table row
  pdf.setDrawColor(0);
  pdf.setLineWidth(0.1);
  // Top border
  pdf.line(14, 75, 194, 75);

  const individualPrice = price;
  const totalPriceForRow = quantity * price;

  pdf.text(productName, 20, 81, { maxWidth: 100 });
  pdf.text(quantity.toString(), 100, 81);
  pdf.text(individualPrice.toString(), 130, 81);
  pdf.text(totalPriceForRow.toString(), 160, 81);

  pdf.line(14, 85, 194, 85);

  // Save the PDF
  pdf.save("invoice.pdf");
};
