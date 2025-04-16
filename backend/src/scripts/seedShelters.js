const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Import the models
const Shelter = require('../models/Shelter');
const User = require('../models/User');

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Function to create admin user if it doesn't exist
async function createAdminUser() {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@petadoption.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists, using existing user');
      return existingAdmin;
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      name: 'Admin',
      email: 'admin@petadoption.com',
      password: hashedPassword,
      role: 'admin'
    });
    
    await adminUser.save();
    console.log('Admin user created successfully');
    return adminUser;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
}

// Function to seed shelters
async function seedShelters() {
  try {
    // First, create admin user
    const adminUser = await createAdminUser();
    
    // Clear existing shelters
    await Shelter.deleteMany({});
    console.log('Existing shelters deleted');

    // Sample shelter data with admin user ID
    const sheltersData = [
      {
        name: "PRAINIMAL FOUNDATION",
        location: "Pune",
        address: "B56, Purandar Society, Kashid Nagar, Pimple Gurav",
        contactPhone: "+918669695454",
        description: "Officially established in 2020, combining Marathi 'PRANI' and English 'Animal' to reflect our cross-cultural mission.",
        contactEmail: "info@prainimal.org",
        website: "https://prainimal.org",
        imageUrl: "https://images.pexels.com/photos/12195421/pexels-photo-12195421.jpeg",
        userId: adminUser._id,
        createdAt: new Date("2020-01-01")
      },
      {
        name: "DARJEELING ANIMAL SHELTER",
        location: "West Bengal",
        address: "Kothi Gaon, Harsing Hatta, Lebong 734105",
        contactPhone: "+917365050368",
        description: "Saved thousands of animals since 1993, eliminating street poisoning through municipal partnerships.",
        contactEmail: "contact@darjeelinganimalshelter.org",
        website: "https://darjeelinganimalshelter.org",
        imageUrl: "https://images.pexels.com/photos/11931735/pexels-photo-11931735.jpeg",
        userId: adminUser._id,
        createdAt: new Date("1993-01-01")
      },
      {
        name: "PEOPLE FOR ANIMALS",
        location: "Hyderabad",
        address: "Opp. Goodwill School, Begum Bazar, 500012",
        contactPhone: "+919505537388",
        description: "Pioneering animal welfare since 1990 when the concept was new to the city.",
        contactEmail: "info@peopleforanimals.org",
        website: "https://peopleforanimals.org",
        imageUrl: "https://images.pexels.com/photos/11683889/pexels-photo-11683889.jpeg",
        userId: adminUser._id,
        createdAt: new Date("1990-01-01")
      },
      {
        name: "ANIMAL AID UNLIMITED",
        location: "Udaipur",
        address: "Near Bhuvana Circus, Kanak Durga Temple",
        contactPhone: "+919828022020",
        description: "Rescues and treats injured street animals since 2002 with special care for disabled animals.",
        contactEmail: "info@animalaidunlimited.org",
        website: "https://animalaidunlimited.org",
        imageUrl: "https://images.pexels.com/photos/4697573/pexels-photo-4697573.jpeg",
        userId: adminUser._id,
        createdAt: new Date("2002-01-01")
      },
      {
        name: "SANJAY GANDHI ANIMAL CARE",
        location: "Delhi",
        address: "Near Raja Garden, New Delhi 110015",
        contactPhone: "+919810156789",
        description: "Delhi's oldest shelter providing medical care to thousands annually since 1980.",
        contactEmail: "contact@sganimalcare.org",
        website: "https://sganimalcare.org",
        imageUrl: "https://images.pexels.com/photos/30556343/pexels-photo-30556343/free-photo-of-heartwarming-image-of-a-rescued-dog-shaking-hand.jpeg",
        userId: adminUser._id,
        createdAt: new Date("1980-01-01")
      }
    ];

    // Insert the sample shelters
    const createdShelters = await Shelter.insertMany(sheltersData);
    console.log(`${createdShelters.length} shelters seeded successfully!`);
    
    // Display the seeded shelters
    createdShelters.forEach(shelter => {
      console.log(`- ${shelter.name} (${shelter._id})`);
    });

    // Close the database connection
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding shelters:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

// Execute the seeding function
seedShelters(); 