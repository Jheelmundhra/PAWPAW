const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for pets
const petStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "petadoption/pets",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    transformation: [{ width: 800, height: 600, crop: "limit" }],
  },
});

// Configure Cloudinary storage for shelters
const shelterStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "petadoption/shelters",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    transformation: [{ width: 800, height: 600, crop: "limit" }],
  },
});

// File filter to only accept images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Configure multer upload for pets
const uploadPet = multer({
  storage: petStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max size
  },
});

// Configure multer upload for shelters
const uploadShelter = multer({
  storage: shelterStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max size
  },
});

module.exports = {
  cloudinary,
  uploadPet,
  uploadShelter,
};
