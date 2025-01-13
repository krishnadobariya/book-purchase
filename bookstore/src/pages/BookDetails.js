import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addCart, viewBook } from "../Redux/Actions/User.action";

function BookDetails() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.bookStore);
  const { id } = useParams();

  const [buttonText, setButtonText] = useState("Add to Cart");
  const [isLoading, setIsLoading] = useState(false);

  const viewBookData = userData?.viewBook?.data?.book;

  useEffect(() => {
    if (id) {
      dispatch(viewBook(id)); // Fetch book details on mount
    }
  }, [id, dispatch]);

  // Check if the item has already been added to the cart
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isInCart = cart.some(item => item?.bookId === id); 
    if (isInCart) {
      setButtonText("Added to Cart");
    }
  }, [id]);

  const addToCart = async () => {
    const payload = { bookId: id };

    setIsLoading(true);

    try {
      const response = await dispatch(addCart(payload));
      if (response?.status === 200) {
        setButtonText("Added to Cart");

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ bookId: id });
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        setButtonText("Try Again");
      }
    } catch (error) {
      console.error(error);
      setButtonText("Try Again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'row', margin: '0 auto', borderRadius: '15px', boxShadow: 3, overflow: 'hidden',width:'90%',marginTop:'40px' }}>
      <CardMedia
        component="img"
        height="350"
        image={viewBookData?.photo}
        alt={viewBookData?.title}
        sx={{ width: '40%', objectFit: 'cover', borderRadius: '10px' }}
      />
      <CardContent sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '60%' }}>
        <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 1 }}>{viewBookData?.title}</Typography>
        <Typography variant="h6" sx={{ color: 'gray', marginBottom: 1 }}>by {viewBookData?.author}</Typography>
        <Typography variant="body1" sx={{ marginBottom: 2, color: 'text.secondary' }}>
          {viewBookData?.description}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
          Price: <span style={{ color: '#1e88e5' }}>${viewBookData?.price}</span>
        </Typography>

        <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={addToCart}
              sx={{ width: '180px', padding: '10px 20px', borderRadius: '8px' }}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : buttonText}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default BookDetails;
