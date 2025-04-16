const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Shelter = require("../models/Shelter");

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
    cb(null, "shelter-" + uniqueSuffix + ext);
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

// GET all shelters
router.get("/", async (req, res) => {
  try {
    let query = {};
    
    // Filter by user if specified
    if (req.query.userId) {
      query.userId = req.query.userId;
    }
    
    const shelters = await Shelter.find(query);
    res.json(shelters);
  } catch (error) {
    console.error("Error fetching shelters:", error);
    res
      .status(500)
      .json({ message: "Error fetching shelters", error: error.message });
  }
});

// GET a single shelter by ID
router.get("/:id", async (req, res) => {
  try {
    const shelterId = req.params.id;
    const shelter = await Shelter.findById(shelterId);
    
    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }
    
    res.json(shelter);
  } catch (error) {
    console.error("Error fetching shelter:", error);
    res.status(500).json({ message: "Error fetching shelter", error: error.message });
  }
});

// POST new shelter (with file upload)
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
    }

    const newShelter = new Shelter({
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      contactEmail: req.body.contactEmail,
      contactPhone: req.body.contactPhone,
      website: req.body.website || "",
      imageUrl: imageUrl,
      userId: req.body.userId // Add the user ID
    });

    const savedShelter = await newShelter.save();
    res.status(201).json({
      message: "Shelter added successfully",
      shelter: savedShelter,
    });
  } catch (error) {
    console.error("Error adding shelter:", error);
    res.status(500).json({ message: "Error adding shelter", error: error.message });
  }
});

// POST new shelter (JSON only)
router.post("/add-json", async (req, res) => {
  try {
    console.log("JSON Request body:", req.body);

    const newShelter = new Shelter({
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      contactEmail: req.body.contactEmail,
      contactPhone: req.body.contactPhone,
      website: req.body.website || "",
      imageUrl: req.body.imageUrl || "",
      userId: req.body.userId
    });

    const savedShelter = await newShelter.save();
    res.status(201).json({
      message: "Shelter added successfully",
      shelter: savedShelter,
    });
  } catch (error) {
    console.error("Error adding shelter:", error);
    res.status(500).json({ message: "Error adding shelter", error: error.message });
  }
});

// Update a shelter
router.put("/:id", async (req, res) => {
  try {
    const shelterId = req.params.id;
    const shelter = await Shelter.findById(shelterId);
    
    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }
    
    // Check if user owns this shelter
    if (shelter.userId.toString() !== req.body.userId) {
      return res.status(403).json({ message: "Not authorized to update this shelter" });
    }
    
    const updatedShelter = await Shelter.findByIdAndUpdate(
      shelterId,
      req.body,
      { new: true }
    );
    
    res.json({
      message: "Shelter updated successfully",
      shelter: updatedShelter
    });
  } catch (error) {
    console.error("Error updating shelter:", error);
    res.status(500).json({ message: "Error updating shelter", error: error.message });
  }
});

// Delete a shelter
router.delete("/:id", async (req, res) => {
  try {
    const shelterId = req.params.id;
    const shelter = await Shelter.findById(shelterId);
    
    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }
    
    // Check if user owns this shelter or is admin
    if (shelter.userId.toString() !== req.body.userId && req.body.role !== 'admin') {
      return res.status(403).json({ message: "Not authorized to delete this shelter" });
    }
    
    await Shelter.findByIdAndDelete(shelterId);
    
    res.json({
      message: "Shelter deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting shelter:", error);
    res.status(500).json({ message: "Error deleting shelter", error: error.message });
  }
});

module.exports = router; 