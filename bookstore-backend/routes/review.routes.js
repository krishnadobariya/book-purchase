const express = require('express');
const reviewController = require('../controllers/review/review.controller');

const router = express.Router();

// Add review
router.post('/addReview/:bookId', reviewController.addReview);

// Get reviews by bookId
router.get('/getBookReview/:bookId', reviewController.getReviews);

module.exports = router;
