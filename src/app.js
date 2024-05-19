const express = require("express");
const bodyParser = require("body-parser");
const leaveRouter = require("./routes/leave");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Define the list of allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://hrms.dimensiongroup.co.in",
];

// Configure CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is included in the allowedOrigins array
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Deny the request
      }
    },
  })
);

app.use("/api", leaveRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});