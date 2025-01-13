const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    photo: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
