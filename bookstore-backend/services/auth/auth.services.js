const User = require('../../models/auth/user.model');
const jwt = require('jsonwebtoken');

// Register new user
async function registerUser({ username, email, password, role }) {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { success: false, message: 'Email already exists', status: 400 };
        }

        const newUser = new User({ username, email, password, role });
        await newUser.save();

        return { success: true, message: 'User registered successfully', user: newUser, status: 201 };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Internal Server Error', status: 500 };
    }
}

// Login user
async function loginUser({ email, password }) {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return { success: false, message: 'User not found', status: 404 };
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return { success: false, message: 'Incorrect password', status: 400 };
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.token = token;
        await user.save();
        return { success: true, message: 'Login successful', token, status: 200 };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Internal Server Error', status: 500 };
    }
}

module.exports = {
    registerUser,
    loginUser,
};
