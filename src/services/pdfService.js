const PDFDocument = require("pdfkit");
const path = require("path");

const createLeavePdfBuffer = (data) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    // Path to the logo image
    const logoPath = path.join(__dirname, "../assets/dimesnion-logo-s.png");

    // Add logo
    doc.image(logoPath, {
      fit: [100, 100],
      align: "center",
      valign: "top",
    });

    // Add some space after the logo
    doc.moveDown(4);

    // Add title
    doc.fontSize(20).text("Leave Application", { align: "center" });

    doc.moveDown();

    // Add employee details in a more structured format
    doc
      .fontSize(12)
      .text(`Employee Name: ${data.employeeName}`, { continued: true })
      .text(" ", { width: 20 }) // Add some spacing
      .text(`Designation: ${data.designation}`)
      .text(`Department: ${data.department}`, { continued: true })
      .text(" ", { width: 20 })
      .text(`Employee Code: ${data.employeeCode}`)
      .text(`Leave Type: ${data.leaveType}`, { continued: true })
      .text(" ", { width: 20 })
      .text(`Type: ${data.type}`)
      .text(`From Date: ${data.fromDate}`, { continued: true })
      .text(" ", { width: 20 })
      .text(`To Date: ${data.toDate}`)
      .text(`Reason: ${data.reason}`)
      .moveDown(2);

    // Closing note
    doc
      .fontSize(10)
      .text("Please approve my leave application.", { align: "center" });

    doc.end();
  });
};

module.exports = createLeavePdfBuffer;