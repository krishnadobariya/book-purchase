const bookService = require('../../services/books/book.services');

// Register new book
exports.registerBook = async (req, res) => {
    const { title, author, description, price, category } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'Photo is required.' });
    }
    const photo = req.file.path;
    try {
        const result = await bookService.registerBook({
            title, author, description, price, category, photo
        });
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};

// Update an existing book
exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, description, price, category, image } = req.body;

    try {
        const result = await bookService.updateBook(id, { title, author, description, price, category, image });
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const result = await bookService.getAllBooks();
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await bookService.getBookById(id);
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await bookService.deleteBook(id);
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};

// Search Book
exports.searchBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1; 
        const limit = parseInt(req.query.limit, 10) || 10; 
        const searchQuery = req.query.search || ''; 

        const result = await bookService.searchBooks(page, limit, searchQuery);

        return res.status(result.status).json(result);
    } catch (error) {
        console.error("Error in searchBooks controller:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};
