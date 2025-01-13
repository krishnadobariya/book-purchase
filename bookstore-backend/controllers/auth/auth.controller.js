const authService = require('../../services/auth/auth.services');

// Register a new user
exports.registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const result = await authService.registerUser({ username, email, password, role });
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await authService.loginUser({ email, password });
        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};
