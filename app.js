const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(bodyParser.json());

// Base route
app.use('/api', userRoutes);
app.get('/get-ip', (req, res) => {
  const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // IP Address retrieve
  res.send(`Your IP address is: ${userIp}`);
});

// Error handling middleware
app.use(errorHandler);
app.use((req, res, next) => {
  const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // IP address extract karna
  console.log('User IP:', userIp);
  next(); // Request process aage badhao
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
