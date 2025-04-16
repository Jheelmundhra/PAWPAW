const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Pet = require("../models/Pet");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Created uploads directory at:", uploadsDir);
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

// File filter to only accept images
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max size
  }
});

// GET all pets
router.get("/", async (req, res) => {
  try {
    let query = {};
    
    // Filter by featured status if specified
    if (req.query.featured === 'true') {
      query.featured = true;
    }
    
    // Filter by user if specified
    if (req.query.userId) {
      query.addedBy = req.query.userId;
    }
    
    const pets = await Pet.find(query);
    res.json(pets);
  } catch (error) {
    console.error("Error fetching pets:", error);
    res
      .status(500)
      .json({ message: "Error fetching pets", error: error.message });
  }
});

// GET a single pet by ID
router.get("/:id", async (req, res) => {
  try {
    const petId = req.params.id;
    const pet = await Pet.findById(petId);
    
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    
    res.json(pet);
  } catch (error) {
    console.error("Error fetching pet:", error);
    res.status(500).json({ message: "Error fetching pet", error: error.message });
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
      // If file uploaded, use the file path with the correct URL path
      imageUrl = `http://localhost:5004/uploads/${req.file.filename}`;
      console.log("Image URL created:", imageUrl);
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
      featured: req.body.featured === 'true',
      addedBy: req.body.userId // Add the user ID if available
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
      featured: req.body.featured === true || req.body.featured === 'true',
      addedBy: req.body.userId
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

// Toggle pet featured status
router.patch("/:id/toggle-featured", async (req, res) => {
  try {
    const petId = req.params.id;
    
    // Find the pet
    const pet = await Pet.findById(petId);
    
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    
    // Toggle the featured status
    pet.featured = !pet.featured;
    
    // Save the updated pet
    const updatedPet = await pet.save();
    
    res.json({
      message: `Pet ${updatedPet.featured ? 'featured' : 'unfeatured'} successfully`,
      pet: updatedPet
    });
  } catch (error) {
    console.error("Error toggling pet featured status:", error);
    res.status(500).json({ message: "Error updating pet", error: error.message });
  }
});

module.exports = router;
