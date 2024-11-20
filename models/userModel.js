// models/userModel.js
const db = require('../config/db');

const User = {
  // Create a new user
  create: (name, email, age, userIp ,  callback) => {
    const sql = 'INSERT INTO test_db (name, email, age, userIp ) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, age, userIp ], (err, result) => {
      if (err) return callback(err);
      callback(null, { id: result.insertId, name, email, age, userIp});
    });
  },

  // Get all users
  getAll: (callback) => {
    const sql = 'SELECT * FROM test_db';
    db.query(sql, callback);
  },

  // Get a user by ID
  getById: (id, callback) => {
    const sql = 'SELECT * FROM test_db WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]); // `results[0]` because it's a single user
    });
  },

  // Update a user by ID
  update: (name, email, age, userIp , callback) => {
    const sql = 'UPDATE test_db SET name = ?, email = ?, age = ?, userIp =?, WHERE id = ?';
    db.query(sql, [name, email, age, userIp , id], callback);
  },

  // Delete a user by ID
  delete: (id, callback) => {
    const sql = 'DELETE FROM test_db WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = User;
