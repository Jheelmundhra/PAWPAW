const express = require("express");
const router = express.Router();
const Shelter = require("../models/Shelter");
const { uploadShelter } = require("../config/cloudinary");

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
    res
      .status(500)
      .json({ message: "Error fetching shelter", error: error.message });
  }
});

// POST new shelter (with file upload)
router.post("/add", uploadShelter.single("image"), async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("File:", req.file);

    let imageUrl = "";

    // Check if we have a file upload or an image URL
    if (req.file) {
      // If file uploaded, use the Cloudinary URL
      imageUrl = req.file.path;
      console.log("Cloudinary Image URL:", imageUrl);
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
      userId: req.body.userId, // Add the user ID
    });

    const savedShelter = await newShelter.save();
    res.status(201).json({
      message: "Shelter added successfully",
      shelter: savedShelter,
    });
  } catch (error) {
    console.error("Error adding shelter:", error);
    res
      .status(500)
      .json({ message: "Error adding shelter", error: error.message });
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
      userId: req.body.userId,
    });

    const savedShelter = await newShelter.save();
    res.status(201).json({
      message: "Shelter added successfully",
      shelter: savedShelter,
    });
  } catch (error) {
    console.error("Error adding shelter:", error);
    res
      .status(500)
      .json({ message: "Error adding shelter", error: error.message });
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
      return res
        .status(403)
        .json({ message: "Not authorized to update this shelter" });
    }

    const updatedShelter = await Shelter.findByIdAndUpdate(
      shelterId,
      req.body,
      { new: true }
    );

    res.json({
      message: "Shelter updated successfully",
      shelter: updatedShelter,
    });
  } catch (error) {
    console.error("Error updating shelter:", error);
    res
      .status(500)
      .json({ message: "Error updating shelter", error: error.message });
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
    if (
      shelter.userId.toString() !== req.body.userId &&
      req.body.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this shelter" });
    }

    await Shelter.findByIdAndDelete(shelterId);

    res.json({
      message: "Shelter deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting shelter:", error);
    res
      .status(500)
      .json({ message: "Error deleting shelter", error: error.message });
  }
});

module.exports = router;
