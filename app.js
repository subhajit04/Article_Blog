
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');

// Create an instance of Express app
const app = express();
app.use(express.json());

// Set up MongoDB connection
mongoose
  .connect('mongodb+srv://mydatabase:mydatabase@cluster0.fyjn2n6.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Define routes
app.use('/api', authRoutes);
app.use('/api', articleRoutes);
app.use('/api', userRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


