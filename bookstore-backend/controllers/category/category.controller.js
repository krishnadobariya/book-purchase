const categoryService = require('../../services/category/category.services');

// Create a new category
exports.createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const result = await categoryService.createCategory({ name, description });
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};

// Update category 
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const result = await categoryService.updateCategory({ id, name, description });
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const result = await categoryService.getCategories();
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};

// Delete category
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await categoryService.deleteCategory(id);
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}