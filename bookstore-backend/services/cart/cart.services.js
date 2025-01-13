const Cart = require('../../models/cart/cart.model');
const Book = require('../../models/books/book.model');
const User = require('../../models/auth/user.model');

// async function addToCart(token, { bookId,quantity }) {
//     try {
//         const book = await Book.findById(bookId);
//         if (!book) {
//             return { success: false, message: 'Book not found', status: 404 };
//         }
//         const user = await User.findOne({ token });
//         if (!user) {
//             throw new Error('User not found');
//         }
//         let cart = await Cart.findOne({ userId: user._id });
//         if (!cart) {
//             cart = new Cart({ userId: user._id, items: [], totalAmount: 0 });
//         }

//         const existingItem = cart.items.find(item => item.bookId.toString() === bookId.toString());
//         if (existingItem) {
//             existingItem.quantity += quantity;
//             existingItem.price = book.price * existingItem.quantity;
//         } else {
//             cart.items.push({ bookId, quantity, price: book.price * quantity });
//         }

//         cart.totalAmount = cart.items.reduce((total, item) => total + item.price, 0);
//         await cart.save();

//         return { success: true, message: 'Item added to cart', cart, status: 200 };
//     } catch (error) {
//         console.error('Error:', error);
//         return { success: false, message: 'Internal Server Error', status: 500 };
//     }
// }
// Add item to cart
async function addToCart(token, { bookId }) {
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return { success: false, message: 'Book not found', status: 404 };
        }

        const user = await User.findOne({ token });
        if (!user) {
            throw new Error('User not found');
        }

        // Check if the user already has a cart
        let cart = await Cart.findOne({ userId: user._id });
        if (!cart) {
            cart = new Cart({ userId: user._id, items: [], totalAmount: 0 });
        }

        // Add the book to the cart (no quantity field)
        cart.items.push({ bookId, price: book.price });

        // Update the total amount
        cart.totalAmount = cart.items.reduce((total, item) => total + item.price, 0);

        await cart.save();

        return { success: true, message: 'Item added to cart', cart, status: 200 };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Internal Server Error', status: 500 };
    }
}


// Get cart by userId
async function getCart(token) {
    try {
        const user = await User.findOne({ token });
        if (!user) {
            throw new Error('User not found');
        }
        const cart = await Cart.findOne({ userId: user._id }).populate('items.bookId');
        if (!cart) {
            return { success: false, message: 'Cart not found', status: 404 };
        }
        return { success: true, cart, status: 200 };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Internal Server Error', status: 500 };
    }
}

// Remove item from cart
async function removeFromCart(token, bookId) {
    try {
        const user = await User.findOne({ token });
        if (!user) {
            throw new Error('User not found');
        }
        const cart = await Cart.findOne({ userId: user._id });
        if (!cart) {
            return { success: false, message: 'Cart not found', status: 404 };
        }

        cart.items = cart.items.filter(item => item.bookId.toString() !== bookId.toString());
        cart.totalAmount = cart.items.reduce((total, item) => total + item.price, 0);

        await cart.save();
        return { success: true, message: 'Item removed from cart', cart, status: 200 };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Internal Server Error', status: 500 };
    }
}

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
};
