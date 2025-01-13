const reviewService = require('../../services/review/review.services');

// Add review
exports.addReview = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token is required", success: false });
    }
    const { bookId } = req.params;
    const { rating, comment } = req.body;
    try {
        const result = await reviewService.addReview({ bookId, token, rating, comment });
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};

// Get reviews by bookId
exports.getReviews = async (req, res) => {
    const { bookId } = req.params;
    try {
        const result = await reviewService.getReviews(bookId);
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};
