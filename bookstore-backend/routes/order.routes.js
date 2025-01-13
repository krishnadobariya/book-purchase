const express = require('express');
const orderController = require('../controllers/order/order.controller');

const router = express.Router();

// Create a new order
router.post('/makeOrder', orderController.createOrder);

// Get orders for user
router.get('/getOrder', orderController.getOrdersByUserId);

// Get order for admin
router.get('/getAllOrders', orderController.getOrders);

module.exports = router;
