const express = require("express");
const router = express.Router();
const Partner = require("../models/Partner");

// Get all partners
router.get("/", async (req, res) => {
  try {
    const partners = await Partner.find();
    res.status(200).json(partners);
  } catch (error) {
    console.error("Error fetching partners:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new partner
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPartner = new Partner({
      name,
      email,
      subject,
      message,
    });

    const savedPartner = await newPartner.save();
    res.status(201).json(savedPartner);
  } catch (error) {
    console.error("Error creating partner:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update partner status
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedPartner = await Partner.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedPartner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    res.status(200).json(updatedPartner);
  } catch (error) {
    console.error("Error updating partner:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
