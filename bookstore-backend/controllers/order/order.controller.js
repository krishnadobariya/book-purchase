const orderService = require('../../services/order/order.services');

// Create a new order
exports.createOrder = async (req, res) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token is required", success: false });
    }
    const { shippingAddress } = req.body;

    try {
        const result = await orderService.createOrder(token, { shippingAddress });
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};

// Get orders for user 
exports.getOrdersByUserId = async (req, res) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token is required", success: false });
    }
    try {
        const result = await orderService.getOrdersByUserId(token);
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};

// Get orders for admin
exports.getOrders = async (req, res) => {
    try {
        const result = await orderService.getOrders();
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};