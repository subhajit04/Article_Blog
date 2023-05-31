const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

router.patch('/:userId', authMiddleware, userController.update);

module.exports = router;
