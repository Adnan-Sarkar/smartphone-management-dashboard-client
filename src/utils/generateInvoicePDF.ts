import { jsPDF } from "jspdf";

export const generateInvoicePDF = (
  buyerName: string,
  sellDate: string,
  products: [
    {
      productName: string;
      quantity: number;
      price: number;
    }
  ]
) => {
  const pdf = new jsPDF();

  // Set font size and style
  pdf.setFontSize(10);

  // Company Name
  pdf.setFontSize(16);
  pdf.text("Company Name", 14, 15);

  // Buyer Name and Sell Date
  pdf.setFontSize(10);
  pdf.text(`Buyer: ${buyerName}`, 14, 30);
  pdf.text(`Sell Date: ${sellDate}`, 14, 45);

  // Function to add a page and reset yPos
  const addPageAndResetY = () => {
    pdf.addPage();
    yPos = 20; // Reset yPos for the new page
  };

  // Table header
  pdf.setFillColor(200, 200, 200);
  pdf.rect(14, 60, 180, 10, "F");
  pdf.setTextColor(0, 0, 0);
  pdf.text("Product Name", 20, 65);
  pdf.text("Quantity", 80, 65);
  pdf.text("Price", 140, 65);

  // Table rows
  let yPos = 75;
  const maxRowsPerPage = 25;

  products.forEach((product, index) => {
    if (index % maxRowsPerPage === 0 && index !== 0) {
      addPageAndResetY();
      // Add header for the new page
      pdf.setFillColor(200, 200, 200);
      pdf.rect(14, yPos, 180, 10, "F");
      pdf.setTextColor(0, 0, 0);
      pdf.text("Product Name", 20, yPos + 5);
      pdf.text("Quantity", 80, yPos + 5);
      pdf.text("Price", 140, yPos + 5);
      yPos += 10;
    }

    // Draw border bottom for each row
    pdf.setDrawColor(0);
    pdf.setLineWidth(0.1);
    pdf.line(14, yPos, 194, yPos);

    pdf.text(product.productName, 20, yPos + 8, { maxWidth: 120 });
    pdf.text(product.quantity.toString(), 80, yPos + 8);
    pdf.text((product.quantity * product.price).toString(), 140, yPos + 8);
    yPos += 15;
  });

  // Total Price
  const totalPrice = products.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );
  pdf.setFontSize(12);
  pdf.setTextColor(40, 40, 40);
  pdf.text(`Total: ${totalPrice}`, 140, yPos + 15);

  // Save the PDF
  pdf.save("invoice.pdf");
};
