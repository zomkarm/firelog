// seedAdmin.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const crypto = require('crypto');
const User = require('../models/User'); // adjust path if needed

dotenv.config(); // Load env vars

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.email);
      return process.exit(0);
    }

    const admin = new User({
      name: 'Super Admin',
      email: 'admin@example.com',
      password: 'Admin@123', // You can change this and store securely
      role: 'admin',
      apiKey: crypto.randomBytes(32).toString('hex'), // secure 64-char key
    });

    await admin.save();
    console.log('✅ Admin seeded successfully:', admin.email);
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed admin:', err);
    process.exit(1);
  }
};

seedAdmin();
