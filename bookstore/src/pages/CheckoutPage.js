import React from "react";
import { Typography, Button, TextField } from "@mui/material";

function CheckoutPage() {
  const handleCheckout = () => {
    alert("Checkout successful!");
    localStorage.removeItem("cart");
  };

  return (
    <div>
      <Typography variant="h4">Checkout</Typography>
      <TextField
        label="Shipping Address"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Payment Details"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleCheckout}>
        Place Order
      </Button>
    </div>
  );
}

export default CheckoutPage;
