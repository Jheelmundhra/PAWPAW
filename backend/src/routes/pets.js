const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Pet = require("../models/Pet");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// GET all pets
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    console.error("Error fetching pets:", error);
    res
      .status(500)
      .json({ message: "Error fetching pets", error: error.message });
  }
});

// POST new pet (with file upload)
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("File:", req.file);

    let imageUrl = "";

    // Check if we have a file upload or an image URL
    if (req.file) {
      // If file uploaded, use the file path
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.imageUrl) {
      // If image URL provided, use it directly
      imageUrl = req.body.imageUrl;
    } else {
      return res
        .status(400)
        .json({ message: "Either image file or image URL must be provided" });
    }

    const newPet = new Pet({
      name: req.body.name,
      breed: req.body.breed,
      age: req.body.age,
      location: req.body.location,
      description: req.body.description,
      imageUrl: imageUrl,
      status: "available",
    });

    const savedPet = await newPet.save();
    res.status(201).json({
      message: "Pet added successfully",
      pet: savedPet,
    });
  } catch (error) {
    console.error("Error adding pet:", error);
    res.status(500).json({ message: "Error adding pet", error: error.message });
  }
});

// POST new pet (JSON only)
router.post("/add-json", async (req, res) => {
  try {
    console.log("JSON Request body:", req.body);

    if (!req.body.imageUrl && !req.body.image) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const newPet = new Pet({
      name: req.body.name,
      breed: req.body.breed,
      age: req.body.age,
      location: req.body.location,
      description: req.body.description || req.body.bio, // Accept either field
      imageUrl: req.body.imageUrl || req.body.image, // Accept either field
      status: "available",
    });

    const savedPet = await newPet.save();
    res.status(201).json({
      message: "Pet added successfully",
      pet: savedPet,
    });
  } catch (error) {
    console.error("Error adding pet:", error);
    res.status(500).json({ message: "Error adding pet", error: error.message });
  }
});

module.exports = router;
