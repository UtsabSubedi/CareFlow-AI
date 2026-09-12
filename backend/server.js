require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Participant = require('./models/Participants.js');
const Staff = require('./models/staffs.js'); // <-- Fixed filename to 'staffs.js'

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/careflow_ai')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('CareFlow AI Backend is running!');
});

// Get all participants/budgets
app.get('/api/participants', async (req, res) => {
  try {
    const participants = await Participant.find().sort({ createdAt: -1 });
    res.json(participants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all staff members (New Route)
app.get('/api/staff', async (req, res) => {
  try {
    const staffList = await Staff.find().sort({ createdAt: -1 }); // <-- Fixed to capital 'Staff'
    res.json(staffList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));