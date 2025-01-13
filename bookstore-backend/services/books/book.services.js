const Book = require('../../models/books/book.model');

// Register new book
async function registerBook({ title, author, description, price, category, photo }) {
    try {
        const newBook = new Book({
            title, author, description, price, category, photo
        });
        await newBook.save();
        return {
            success: true,
            message: "BOOK REGISTERED SUCCESSFULLY",
            patient: newBook,
            status: 201,
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            message: "Internal Server Error",
            success: false,
            status: 500,
        };
    }
}

// Update existing book
async function updateBook(id, { title, author, description, price, category, image }) {
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, description, price, category, image }, { new: true });
        if (!updatedBook) {
            return { success: false, message: 'Book not found', status: 404 };
        }
        return {
            success: true,
            message: 'Book updated successfully',
            book: updatedBook,
            status: 200,
        };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Internal Server Error', status: 500 };
    }
}

// Get all books
async function getAllBooks() {
    try {
        const books = await Book.find();
        return { success: true, books, status: 200 };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Internal Server Error', status: 500 };
    }
}

// Get a single book by ID
async function getBookById(id) {
    try {
        const book = await Book.findById(id);
        if (!book) {
            return { success: false, message: 'Book not found', status: 404 };
        }
        return { success: true, book, status: 200 };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Internal Server Error', status: 500 };
    }
}

// Delete a book
async function deleteBook(id) {
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return { success: false, message: 'Book not found', status: 404 };
        }
        return { success: true, message: 'Book deleted successfully', status: 200 };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Internal Server Error', status: 500 };
    }
}

// Search book
const searchBooks = async (page, limit, searchQuery) => {
    try {
        page = Math.max(parseInt(page, 10), 1);
        limit = Math.max(parseInt(limit, 10), 1);
        const skip = (page - 1) * limit;

        let searchFilter = {};

        if (searchQuery) {
            searchFilter = {
                $or: [
                    { title: { $regex: searchQuery, $options: 'i' } }, 
                    { author: { $regex: searchQuery, $options: 'i' } },
                ],
            };
        }

        const total = await Book.countDocuments(searchFilter);

        const books = await Book.find(searchFilter)
            .skip(skip)
            .limit(limit);

        if (books.length === 0) {
            return {
                success: false,
                message: "No books found matching your search criteria.",
                status: 404,
            };
        }

        return {
            success: true,
            message: "Books retrieved successfully.",
            data: books,
            totalCount: total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            status: 200,
        };
    } catch (error) {
        console.error("Error in searchBooks service:", error);
        return {
            message: "Internal Server Error",
            success: false,
            status: 500,
        };
    }
};

module.exports = {
    registerBook,
    updateBook,
    getAllBooks,
    getBookById,
    deleteBook,
    searchBooks
};
