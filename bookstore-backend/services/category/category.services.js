const Category = require('../../models/category/category.model');

// Create a new category
async function createCategory({ name, description }) {
    try {
        const newCategory = new Category({ name, description });
        await newCategory.save();
        return { success: true, message: 'Category created successfully', category: newCategory, status: 201 };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Internal Server Error', status: 500 };
    }
}

// Update category 
async function updateCategory({ id, name, description }) {
    try {
        const category = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!category) {
            return { success: false, message: 'Category not found', status: 404 };
        }
        return {
            success: true, message: 'Category updated successfully', category, status: 200
        }
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Internal Server Error', status: 500 };
    }
}

// Get all categories
async function getCategories() {
    try {
        const categories = await Category.find();
        return { success: true, categories, status: 200 };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Internal Server Error', status: 500 };
    }
}

// Delete category
async function deleteCategory({ id }) {
    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return { success: false, message: 'Category not found', status: 404 };
        }
        return { success: true, message: 'Category deleted successfully', status: 200 };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Internal Server Error', status: 500 };
    }
}
module.exports = {
    createCategory,
    updateCategory,
    getCategories,
    deleteCategory
};
