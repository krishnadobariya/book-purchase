import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCart, removeCart } from "../Redux/Actions/User.action";
import { useEffect, useState } from "react";

const CartPage = ({ onCheckout }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.bookStore);
  const { id } = useParams();

  const [cartItems, setCartItems] = useState([]);
  const deliveryCharge = 40;  // Fixed delivery charge per product
  const promotionDiscount = 40;  // Promotion discount per product

  useEffect(() => {
    const payload = {
      bookId: id,
    };
    dispatch(getCart(payload));
  }, []);

  useEffect(() => {
    if (userData?.getCart?.data?.cart?.items) {
      const items = userData.getCart.data.cart.items.map((item) => ({
        ...item,
        quantity: 1,
      }));
      setCartItems(items);
    }
  }, [userData]);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.bookId.price || 0) * (item.quantity || 1),
    0
  );

  // Adjusting delivery charge and promotion discount based on the number of items in the cart
  const totalWithDelivery = totalPrice + deliveryCharge * cartItems.length;  // Total with delivery charge
  const totalAfterPromotion = totalWithDelivery - promotionDiscount * cartItems.length;  // Total after applying promotion

  const handleQuantityChange = (id, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.bookId._id === id
          ? {
            ...item,
            quantity:
              action === "increase"
                ? item.quantity + 1
                : item.quantity > 1
                  ? item.quantity - 1
                  : item.quantity, // Prevent quantity going below 1
          }
          : item
      )
    );
  };

  const removeCartHandle = (id) => {
    dispatch(removeCart(id));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter((item) => item.bookId !== id);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems((prevItems) => prevItems.filter((item) => item.bookId._id !== id));
  };

  return (
    <TableContainer component={Paper} sx={{ margin: "20px auto", maxWidth: 800 }}>
      <Typography variant="h5" sx={{ margin: 2 }}>
        🛒 Your Cart
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Book</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <TableRow key={item.bookId._id}>
                <TableCell>{item.bookId.title}</TableCell>
                <TableCell align="right">${item.bookId.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <button
                    onClick={() => handleQuantityChange(item.bookId._id, "decrease")}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    style={{ width: "40px", textAlign: "center" }}
                    readOnly
                  />
                  <button
                    onClick={() => handleQuantityChange(item.bookId._id, "increase")}
                  >
                    +
                  </button>
                </TableCell>
                <TableCell align="right">
                  ${(item.bookId.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell colSpan={3} align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ fontSize: "10px" }}
                    onClick={() => {
                      removeCartHandle(item?.bookId?._id);
                    }}
                  >
                    Remove from cart
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="body1">Your cart is empty!</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {cartItems.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
            <div colSpan={4} align="right">
              <Typography>Items</Typography>
            </div>
            <div align="right">
              <Typography>${totalPrice.toFixed(2)}</Typography>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
            <div colSpan={4} align="right">
              <Typography>Delivery</Typography>
            </div>
            <div align="right">
              <Typography>${(deliveryCharge * cartItems.length).toFixed(2)}</Typography>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
            <div colSpan={4} align="right">
              <Typography>Total</Typography>
            </div>
            <div align="right">
              <Typography>${totalWithDelivery.toFixed(2)}</Typography>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
            <div colSpan={4} align="right">
              <Typography>Promotion Applied</Typography>
            </div>
            <div align="right">
              <Typography>-${(promotionDiscount * cartItems.length).toFixed(2)}</Typography>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
            <div colSpan={4} align="right">
              <Typography>Order Total</Typography>
            </div>
            <div align="right">
              <Typography>${totalAfterPromotion.toFixed(2)}</Typography>
            </div>
          </div>
        </div>
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
        onClick={onCheckout}
        disabled={cartItems.length === 0} // Disable button if cart is empty
      >
        Proceed to Checkout
      </Button>
    </TableContainer>
  );
};

export default CartPage;


