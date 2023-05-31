const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

const signup = async (req, res) => {
  try {
    const { email, password, name, age } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        statusCode: 409,
        error: 'Conflict',
        message: 'User already exists',
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(config.bcryptSaltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword, name, age });
    await newUser.save();

    return res.status(201).json({
      statusCode: 201,
      data: {
        user: newUser,
      },
      message: 'User created successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An error occurred while processing your request',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Invalid email or password',
      });
    }

    // Compare the passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Invalid email or password',
      });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ user: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      statusCode: 200,
      data: {
        token,
        user,
      },
      message: 'Login successful',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An error occurred while processing your request',
    });
  }
};

module.exports = { signup, login };
