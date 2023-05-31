const User = require('../models/user');

const update = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, age } = req.body;

    // Find the user and update the profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, age },
      { new: true }
    );

    return res.status(200).json({
      statusCode: 200,
      data: {
        user: updatedUser,
      },
      message: 'User profile updated successfully',
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

module.exports = { update };
