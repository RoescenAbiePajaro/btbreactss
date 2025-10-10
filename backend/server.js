const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

// JWT Secret Key (in production, store this in environment variables)
const JWT_SECRET = 'your_jwt_secret_key_here';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Admin Schema
const adminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accessCode: { type: String, required: true }
});

const Admin = mongoose.model('Admin', adminSchema);

// Test Endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Admin server is running' });
});

// Admin Login Endpoint
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return token and admin info (excluding password)
    const adminData = admin.toObject();
    delete adminData.password;
    
    res.status(200).json({
      message: 'Login successful',
      token,
      admin: adminData
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Admin Registration Endpoint
app.post('/api/admin/register', async (req, res) => {
  const { firstName, lastName, username, password, accessCode } = req.body;

  // Validation
  if (!firstName || !lastName || !username || !password || !accessCode) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  // Check admin access code
  if (accessCode !== 'ADMIN123') {
    return res.status(403).json({ message: 'Invalid admin access code' });
  }

  try {
    // Check if admin username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const admin = new Admin({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      accessCode
    });

    await admin.save();
    res.status(201).json({ message: 'Admin registration successful' });
  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({ message: 'Server error during admin registration' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Admin server running on port ${PORT}`);
});