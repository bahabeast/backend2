require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bookRoutes = require("./routes/weatherRoutes");

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON requests
app.use(cors()); // Enable CORS
app.use("/api", bookRoutes);	

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("Error: MONGO_URI is not defined in .env file");
  process.exit(1); // Stop server if no DB URI
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const { swaggerUi, swaggerDocs } = require("./swagger");

// Swagger API Docs Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

console.log("📄 Swagger Docs available at http://localhost:5000/api-docs");
