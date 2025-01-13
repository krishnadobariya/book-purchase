import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Badge,
} from "@mui/material";
import { Search, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../Redux/Actions/User.action";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartdata = useSelector((state) => state.bookStore);
  console.log('cartdata',cartdata);
  const cartItems = cartdata?.getCart?.data?.cart?.items?.length
  useEffect(() => {
    const payload = {
      bookId: JSON.parse(localStorage.getItem("cart")) || [],
    };
    dispatch(getCart(payload));
  }, []);

  return (
    <AppBar position="static" color="primary" sx={{ marginBottom: 2 }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          📚 BookStore
        </Typography>
        <div style={{ position: "relative", marginRight: 16 }}>
          <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            sx={{
              backgroundColor: "white",
              padding: "0 10px",
              borderRadius: "5px",
              width: "200px",
            }}
          />
          <IconButton>
            <Search />
          </IconButton>
        </div>
        <IconButton color="inherit" onClick={() => navigate("/cart")}>
          <Badge
            badgeContent={cartItems}
            color="secondary"
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "red", // Change the badge background color to red
                color: "white", // Optionally, set the text color to white for better contrast
              },
            }}
          >
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
