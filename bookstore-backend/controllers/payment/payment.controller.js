const paymentService = require('../../services/payment/payment.services');

// Process payment
exports.processPayment = async (req, res) => {
    const { amount, paymentMethod } = req.body;
    try {
        const result = await paymentService.processPayment({ amount, paymentMethod });
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};
