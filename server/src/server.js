// Import required packages
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

// Load environment varaibles from .env file
require('dotenv').config();

// Create an instance of Express
const app = express();

// Connect to MongoDB using environment variables 
mongoose.connect(process.env.DB_CONNECTION, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log(error));

// Create an instance of ApolloServer
const server = new ApolloServer({
    // TODO: Add typeDefs and resolvers here
});

// Apply the ApolloServer middleware to Express
server.applyMiddleware({ app });

// Set the port for the server to listen on 
const port = process.env.DB_PORT || 3000; 

// Start the server
app.listen(port, () => {
    console.log('Server running on port 3000'); 
});