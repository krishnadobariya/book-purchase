const express = require('express');
const cartController = require('../controllers/cart/cart.controller');

const router = express.Router();

// Add item to cart
router.post('/addToCart', cartController.addToCart);

// Get cart by userId
router.post('/getCartItems', cartController.getCart);

// Remove item from cart
router.delete('/deleteFromCart/:bookId', cartController.removeFromCart);

module.exports = router;
