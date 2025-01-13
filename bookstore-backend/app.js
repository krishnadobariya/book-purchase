const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Initialize dotenv for environment variables
dotenv.config();

// Create an instance of express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Requests
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Connect to MongoDB
const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/bookstore'; // Make sure to replace with your own MongoDB URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Import Routes
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const orderRoutes = require('./routes/order.routes');
const reviewRoutes = require('./routes/review.routes');
const categoryRoutes = require('./routes/category.routes');
const paymentRoutes = require('./routes/payment.routes');
const cartRoutes = require('./routes/cart.routes');
 
// Use Routes
app.use('/auth', authRoutes); // Authentication routes
app.use('/books', bookRoutes); // Book routes
app.use('/orders', orderRoutes); // Order routes
app.use('/reviews', reviewRoutes); // Review routes
app.use('/categories', categoryRoutes); // Category routes
app.use('/payment', paymentRoutes); // Payment routes
app.use('/cart', cartRoutes); // Cart routes

// Default route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Bookstore API!');
});

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
