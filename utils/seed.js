const mongoose = require('mongoose');
const db = require('../config/connection'); // Use the existing connection setup
const { User, Thought } = require('../models');
const { users, thoughts } = require('./data');

const seedDatabase = async () => {
    // Wait for the existing database connection to open
    await db;

    try {
        console.log('Connected to MongoDB.');

        // Clear existing data
        await User.deleteMany({});
        await Thought.deleteMany({});
        console.log('Existing data cleared.');

        // Insert users
        await User.insertMany(users);
        console.log('Users inserted.');

        // Insert thoughts
        // Assumes thoughts data is prepared to be associated directly without additional processing
        await Thought.insertMany(thoughts);
        console.log('Thoughts inserted.');

        console.log('Database seeded!');
    } catch (err) {
        console.error('Failed to seed database:', err);
    } finally {
        // Since we're using the existing connection, we'll not forcefully close it here.
        // If running this script standalone, you might want to uncomment the next line:
        // mongoose.connection.close();
        console.log('Seeding complete.');
        process.exit(0);
    }
};

seedDatabase().catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
});
