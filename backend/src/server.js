const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const login = require("./routes/login");
require("dotenv").config();

const app = express();

// Enhanced CORS configuration
app.use(cors());

// Handle preflight requests
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Import routes
const petRoutes = require("./routes/pets");
const partnerRoutes = require("./routes/partners");

// Use routes with proper ordering
app.use("/api/auth", login); // Login routes with auth prefix
app.use("/api/pets", petRoutes);
app.use("/api/partners", partnerRoutes);

// Test routes
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Simple pets route that always returns data
app.get("/api/pets", (req, res) => {
  const testPets = [
    {
      _id: "1",
      name: "Max",
      breed: "Golden Retriever",
      age: 3,
      location: "New York",
      description: "Friendly dog",
      imageUrl:
        "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg",
    },
    {
      _id: "2",
      name: "Luna",
      breed: "Siamese Cat",
      age: 2,
      location: "Los Angeles",
      description: "Sweet cat",
      imageUrl: "https://placekitten.com/400/300",
    },
  ];
  res.json(testPets);
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Test URLs:");
  console.log(`- http://localhost:${PORT}/test`);
  console.log(`- http://localhost:${PORT}/api/pets`);
});
