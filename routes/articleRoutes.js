const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const articleController = require('../controllers/articleController');

const router = express.Router();

router.post('/', authMiddleware, articleController.create);
router.get('/', authMiddleware, articleController.getAll);

module.exports = router;

