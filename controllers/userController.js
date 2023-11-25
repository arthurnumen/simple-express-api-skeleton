const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const newUser = new User({ username, email });

    // Save the user to the database
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    user.username = username || user.username;
    user.email = email || user.email;

    // Handle profile picture update
    if (req.file) {
      // Assuming 'profilePicture' is the key used for the file in the form data
      user.profilePicture = req.file.buffer.toString('base64');
    }

    // Save the updated user to the database
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
