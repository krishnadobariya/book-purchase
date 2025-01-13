import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllBook } from "../Redux/Actions/User.action";
import { useNavigate } from "react-router-dom";

const BookCard = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.bookStore);
  const navigate = useNavigate();
  const getBookData = userData?.getAllBook?.data?.books;

  const handleView = (id) => {
    navigate(`/book/${id}`);
  };

  useEffect(() => {
    dispatch(getAllBook());
  }, [dispatch]);

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {getBookData && getBookData.length > 0 ? (
        getBookData.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <Card
              sx={{
                maxWidth: 345,
                margin: 2,
                borderRadius: "10px",
                boxShadow: 3,
                transition: "all 0.7s ease-in-out",
                '&:hover': {
                  transform: "scale(1.02)",
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={book.photo}
                alt={book.title}
                sx={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ padding: "16px" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    marginBottom: "8px",
                    color: "#333",
                  }}
                >
                  {book.title || "No Title"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: "12px" }}
                >
                  {book.author || "Unknown Author"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    marginBottom: "1px",
                    lineHeight: "1.5",
                    height: "50px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {book.description || "No description available."}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: "#1976d2",
                    marginBottom: "12px",
                    fontSize:"30px"
                  }}
                >
                  ${book.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    padding: "12px",
                    borderRadius: "8px",
                    textTransform: "none",
                    '&:hover': {
                      backgroundColor: "#1565c0",
                    },
                  }}
                  onClick={() => handleView(book._id)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="h6" sx={{ margin: "auto" }}>
          No books available.
        </Typography>
      )}
    </Grid>
  );
};

export default BookCard;
