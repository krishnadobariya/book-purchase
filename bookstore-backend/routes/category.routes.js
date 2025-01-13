const express = require('express');
const categoryController = require('../controllers/category/category.controller');

const router = express.Router();

// Create a new category
router.post('/add-category', categoryController.createCategory);

// Update category
router.put('/update-category/:id', categoryController.updateCategory);

// Get all categories
router.get('/get-all-categories', categoryController.getCategories);

// Delete category
router.delete('/delete-category/:id', categoryController.deleteCategory);

module.exports = router;
