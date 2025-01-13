const cartService = require('../../services/cart/cart.services');

// Add to cart
exports.addToCart = async (req, res) => {
    const { bookId } = req.body;
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token is required", success: false });
    }
    try {
        const result = await cartService.addToCart(token, { bookId });
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};

// Get cart by userId
exports.getCart = async (req, res) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token is required", success: false });
    }
    try {
        const result = await cartService.getCart(token);
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token is required", success: false });
    }
    const { bookId } = req.params;
    try {
        const result = await cartService.removeFromCart(token, bookId);
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};
