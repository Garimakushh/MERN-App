const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const serverless = require("serverless-http");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (run once on cold start)
mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
const userRoute = require("./routes/userRoute");
app.use("/api/users", userRoute); // Add a base path

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Export the handler for Vercel
module.exports.handler = serverless(app);
