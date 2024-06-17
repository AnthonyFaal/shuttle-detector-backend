const express = require('express');
const connectDB = require('./config/dbconfig');
const userRoutes = require('./src/routes/user.routes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use user routes
app.use('/api/users', userRoutes);

// Connect to MongoDB
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => {
  console.error("Failed to start the server due to database connection error:", err);
});
