const express = require('express');
const bookController = require('../controllers/books/book.controller');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Register a new book
router.post('/register-book', (req, res, next) => {
    upload.single('photo')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        next();
    });
}, bookController.registerBook);

// Get all books
router.get('/getBooks', bookController.getAllBooks);

// Get a book by ID
router.get('/viewBook/:id', bookController.getBookById);

// Update a book
router.put('/updateBook/:id', (req, res, next) => {
    upload.single('photo')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        next();
    });
}, bookController.updateBook);

// Delete a book
router.delete('/deleteBook/:id', bookController.deleteBook);

// Serch Book
router.get('/search', bookController.searchBooks);

module.exports = router;
