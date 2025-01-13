// Mock Payment Gateway Service (for demo purposes)
async function processPayment({ amount, paymentMethod }) {
    try {
        if (paymentMethod !== 'credit_card' && paymentMethod !== 'paypal') {
            return { success: false, message: 'Invalid payment method', status: 400 };
        }

        // Simulate payment processing
        const paymentStatus = Math.random() > 0.5 ? 'success' : 'failure';

        if (paymentStatus === 'failure') {
            return { success: false, message: 'Payment failed', status: 402 };
        }

        return { success: true, message: 'Payment successful', status: 200 };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Internal Server Error', status: 500 };
    }
}

module.exports = {
    processPayment,
};
