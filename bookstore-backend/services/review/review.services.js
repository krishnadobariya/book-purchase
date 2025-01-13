const Review = require('../../models/review/review.model');
const User = require('../../models/auth/user.model');

// Add review for a book
async function addReview({ bookId, token, rating, comment }) {
    try {
        console.log("token",token);
        
        const user = await User.findOne({ token });
        if (!user) {
            throw new Error('User not found');
        }
        const newReview = new Review({ bookId, userId: user._id, rating, comment });
        await newReview.save();
        return { success: true, message: 'Review added successfully', review: newReview, status: 201 };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Internal Server Error', status: 500 };
    }
}

// Get reviews for a book
async function getReviews(bookId) {
    try {
        const reviews = await Review.find({ bookId }).populate('userId');
        return { success: true, reviews, status: 200 };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Internal Server Error', status: 500 };
    }
}

module.exports = {
    addReview,
    getReviews,
};
