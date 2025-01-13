const express = require('express');
const paymentController = require('../controllers/payment/payment.controller');

const router = express.Router();

// Process payment
router.post('/pay', paymentController.processPayment);

module.exports = router;
