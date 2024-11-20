const User = require('../models/userModel');
const axios = require('axios');  // Importing axios to get public IP

exports.createUser = async (req, res) => {
  const { name, email, age } = req.body;
  
  try {
    // Fetch the public IP using an external API (ipify)
    const response = await axios.get('https://api.ipify.org?format=json');
    const userIp = response.data.ip;  // Public IP from the response

    // Log the public IP address to the console
    console.log('Public IP: ', userIp);

    // Save user data along with public IP to the database
    User.create(name, email, age, userIp, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(result);
    });
  } catch (error) {
    console.error('Error fetching public IP:', error);
    res.status(500).json({ message: 'Failed to fetch public IP' });
  }
};

exports.getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get a single user by ID
exports.getUserById = (req, res) => {
    const { id } = req.params;
    User.getById(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!result) return res.status(404).json({ message: 'User not found' });
      res.json(result);
    });
};
  
// Update a user by ID
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, age, userIp } = req.body;
    User.update(id, name, email, age, userIp,  (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User updated successfully' });
    });
};
  
// Delete a user by ID
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    User.delete(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    });
};
