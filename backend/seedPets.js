require("dotenv").config();
const mongoose = require("mongoose");
const Pet = require("./src/models/Pet");

// Sample pet data from the frontend
const samplePets = [
  {
    name: "Buddy",
    breed: "Golden Retriever",
    age: 2,
    location: "New York",
    description:
      "Friendly and energetic golden who loves long walks and playing fetch!",
    imageUrl: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80",
    status: "available",
  },
  {
    name: "Luna",
    breed: "Siberian Husky",
    age: 3,
    location: "Chicago",
    description:
      "Beautiful blue-eyed husky who enjoys cold weather and has lots of energy!",
    imageUrl: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea",
    status: "available",
  },
  {
    name: "Max",
    breed: "German Shepherd",
    age: 4,
    location: "Los Angeles",
    description:
      "Loyal and protective companion, great with families and very intelligent.",
    imageUrl: "https://images.unsplash.com/photo-1567752881298-894bb81f9378",
    status: "available",
  },
  {
    name: "Bella",
    breed: "Poodle",
    age: 1,
    location: "Miami",
    description:
      "Playful and smart poodle puppy who loves learning new tricks!",
    imageUrl: "https://images.unsplash.com/photo-1594149929911-78975a43d4f5",
    status: "available",
  },
  {
    name: "Charlie",
    breed: "Beagle",
    age: 2,
    location: "Seattle",
    description: "Curious and friendly beagle with a great nose for adventure!",
    imageUrl: "https://images.unsplash.com/photo-1591769225440-811ad7d6eab2",
    status: "available",
  },
  {
    name: "Lucy",
    breed: "Bulldog",
    age: 5,
    location: "Boston",
    description: "Chill and relaxed bulldog who loves naps and short walks.",
    imageUrl: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01",
    status: "available",
  },
  {
    name: "Cooper",
    breed: "Dachshund",
    age: 1,
    location: "Austin",
    description: "Adorable little sausage dog with lots of personality!",
    imageUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    status: "available",
  },
  {
    name: "Daisy",
    breed: "Labrador Retriever",
    age: 2,
    location: "Denver",
    description: "Sweet and gentle lab who loves swimming and playing ball.",
    imageUrl: "https://images.unsplash.com/photo-1544568100-847a948585b9",
    status: "available",
  },
  {
    name: "Rocky",
    breed: "Boxer",
    age: 3,
    location: "Atlanta",
    description: "Energetic and goofy boxer who will keep you laughing!",
    imageUrl: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8",
    status: "available",
  },
  {
    name: "Molly",
    breed: "Shih Tzu",
    age: 4,
    location: "San Francisco",
    description: "Sweet and affectionate lap dog who loves cuddles.",
    imageUrl: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993",
    status: "available",
  },
];

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/petadoption")
  .then(async () => {
    console.log("Connected to MongoDB");

    try {
      // Clear existing pets collection
      await Pet.deleteMany({});
      console.log("Cleared existing pets data");

      // Insert sample pets
      const result = await Pet.insertMany(samplePets);
      console.log(`Added ${result.length} pets to the database`);
      console.log("Database seeding completed successfully");
    } catch (error) {
      console.error("Error seeding database:", error);
    } finally {
      // Close MongoDB connection
      mongoose.connection.close();
      console.log("MongoDB connection closed");
    }
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err);
  });
