// Import the Express module
const express = require('express');

// Create an Express application
const app = express();

// Define a route for the root endpoint
app.get('/', (req, res) => {
  res.send('here is the route for the endpoint');
});

// Set the port for the server to listen on
const port = 3000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
