require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bookRoutes = require("./routes/weatherRoutes");

const app = express();

app.use(bodyParser.json()); 
app.use(cors()); 
app.use("/api", bookRoutes);	

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("Error: MONGO_URI is not defined in .env file");
  process.exit(1); 
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const { swaggerUi, swaggerDocs } = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

console.log("📄 Swagger Docs available at http://localhost:5000/api-docs");
