const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Import the models
const Pet = require('../models/Pet');
const User = require('../models/User');

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully for seeding pets'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Function to get an admin or shelter user for the pets
async function getUserForPets() {
  try {
    // First try to find a shelter user
    let user = await User.findOne({ role: 'shelter' });
    
    if (!user) {
      // If no shelter user, try to find an admin
      user = await User.findOne({ role: 'admin' });
      
      if (!user) {
        // If no admin either, create an admin user
        console.log('No suitable user found, creating admin user...');
        
        const newAdmin = new User({
          name: 'Admin',
          email: 'admin@petadoption.com',
          password: await require('bcryptjs').hash('admin123', 10),
          role: 'admin'
        });
        
        user = await newAdmin.save();
        console.log('Admin user created');
      }
    }
    
    console.log(`Using user: ${user.name} (${user._id})`);
    return user;
  } catch (error) {
    console.error('Error getting user for pets:', error);
    throw error;
  }
}

// Function to seed pets
async function seedPets() {
  try {
    // Get a user for the pets
    const user = await getUserForPets();
    
    // Clear existing pets
    await Pet.deleteMany({});
    console.log('Existing pets deleted');

    // Sample pets data
    const petsData = [
      {
        name: "Bulbha",
        breed: "Indie",
        age: 8,
        location: "Mumbai",
        description: "Bulbha is a friendly and energetic dog who loves to play and go for walks. He's good with children and other dogs.",
        imageUrl: "https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg",
        status: "available",
        featured: true,
        addedBy: user._id
      },
      {
        name: "Push",
        breed: "Indie",
        age: 18,
        location: "Delhi",
        description: "Push is a calm and gentle dog who enjoys cuddling and short walks. He's well-trained and adapts quickly to new environments.",
        imageUrl: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg",
        status: "available",
        featured: true,
        addedBy: user._id
      },
      {
        name: "Barti",
        breed: "Indie",
        age: 10,
        location: "Kolkata",
        description: "Barti is an intelligent and playful pup who loves to learn new tricks. He's very social and gets along well with everyone.",
        imageUrl: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg",
        status: "available",
        featured: false,
        addedBy: user._id
      },
      {
        name: "Delilah",
        breed: "Indie",
        age: 9,
        location: "Bangalore",
        description: "Delilah is a sweet and affectionate dog who loves attention. She's good with cats and enjoys being part of a family.",
        imageUrl: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
        status: "available",
        featured: true,
        addedBy: user._id
      },
      {
        name: "Pepper",
        breed: "Indie",
        age: 4,
        location: "Chennai",
        description: "Pepper is a curious and adventurous puppy with lots of energy. He loves exploring and would do well in an active household.",
        imageUrl: "https://images.pexels.com/photos/774731/pexels-photo-774731.jpeg",
        status: "available",
        featured: false,
        addedBy: user._id
      },
      {
        name: "Ragul",
        breed: "Indie",
        age: 3,
        location: "Hyderabad",
        description: "Ragul is a tiny ball of joy who loves to play with toys and sleep in warm spots. He's very adaptable and easy to care for.",
        imageUrl: "https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg",
        status: "available",
        featured: false,
        addedBy: user._id
      },
      {
        name: "Pasta",
        breed: "Indie",
        age: 7,
        location: "Pune",
        description: "Pasta is a cheerful dog who loves to be around people. She's well-behaved and enjoys playing in the yard and going for car rides.",
        imageUrl: "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg",
        status: "available",
        featured: true,
        addedBy: user._id
      }
    ];

    // Insert the sample pets
    const createdPets = await Pet.insertMany(petsData);
    console.log(`${createdPets.length} pets seeded successfully!`);
    
    // Display the seeded pets
    createdPets.forEach(pet => {
      console.log(`- ${pet.name} (${pet._id}) - ${pet.featured ? 'Featured' : 'Not Featured'}`);
    });

    // Close the database connection
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding pets:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

// Execute the seeding function
seedPets();
