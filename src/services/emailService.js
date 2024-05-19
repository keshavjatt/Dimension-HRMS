const nodemailer = require("nodemailer");

const sendLeaveEmail = async (pdfBuffer, data) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "keshavjatt780@gmail.com",
      pass: "rqdl psya lmnm lght",
    },
  });

  let mailOptions = {
    from: '"Dimension Group" <keshavjatt780@gmail.com>',
    to: "thecoder780@gmail.com",
    cc: "keshav.bajwa@dimensiongroup.co.in",
    subject: "Leave Application",
    text: "Please find attached the leave application.",
    attachments: [
      {
        filename: `leave_${data.employeeCode}.pdf`,
        content: pdfBuffer,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendLeaveEmail;