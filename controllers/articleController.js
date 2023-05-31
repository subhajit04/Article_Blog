const Article = require('../models/article');

const create = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { userId } = req.params;

    // Create a new article
    const newArticle = new Article({ title, description, author: userId });
    await newArticle.save();

    return res.status(201).json({
      statusCode: 201,
      data: {
        article: newArticle,
      },
      message: 'Article created successfully',
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

const getAll = async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'name');
    return res.status(200).json({
      statusCode: 200,
      data: {
        articles,
      },
      message: 'Articles retrieved successfully',
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

module.exports = { create, getAll };
