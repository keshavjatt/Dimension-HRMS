const express = require("express");
const createLeavePdfBuffer = require("../services/pdfService");
const sendLeaveEmail = require("../services/emailService");

const router = express.Router();

router.post("/sendMails", async (req, res) => {
  const formData = req.body;

  // Validate form data
  const requiredFields = [
    "employeeName",
    "designation",
    "department",
    "employeeCode",
    "leaveType",
    "type",
    "fromDate",
    "toDate",
    "reason",
  ];

  for (let field of requiredFields) {
    if (!formData[field]) {
      return res
        .status(400)
        .json({ message: `All fields are mandatory. Missing: ${field}` });
    }
  }

  try {
    const pdfBuffer = await createLeavePdfBuffer(formData);
    await sendLeaveEmail(pdfBuffer, formData);

    res.status(200).json({ message: "Mail sent successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "There was an error processing your request." });
  }
});

module.exports = router;