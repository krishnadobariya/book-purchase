const Order = require('../../models/order/order.model');
const Cart = require('../../models/cart/cart.model');
const User = require('../../models/auth/user.model');

// Create an order from cart
async function createOrder(token, { shippingAddress }) {
    try {
        const user = await User.findOne({ token });
        if (!user) {
            throw new Error('User not found');
        }
        const cart = await Cart.findOne({ userId: user._id });
        if (!cart) {
            return { success: false, message: 'Cart not found', status: 404 };
        }

        const order = new Order({
            userId: user._id,
            items: cart.items,
            totalAmount: cart.totalAmount,
            shippingAddress,
        });
        await order.save();

        // Clear cart after order is placed
        await Cart.deleteOne({ userId: user._id });

        return { success: true, message: 'Order placed successfully', order, status: 201 };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Internal Server Error', status: 500 };
    }
}

// Get all orders for user
async function getOrdersByUserId(token) {
    try {
        const user = await User.findOne({ token });
        if (!user) {
            throw new Error('User not found');
        }
        const orders = await Order.find({ userId: user._id });
        return { success: true, orders, status: 200 };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Internal Server Error', status: 500 };
    }
}

// Get orders for admin
async function getOrders() {
    try {
        const orders = await Order.find();
        return { success: true, orders, status: 200 };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Internal Server Error', status: 500 };
    }
}

module.exports = {
    createOrder,
    getOrdersByUserId,
    getOrders
};
