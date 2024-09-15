// Import the express module
const express = require('express');

// Initialize the express app
const app = express();

// Define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello, Node.js!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
