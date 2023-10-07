// TopNavbar.js
import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const TopNavbar = ({ handleDrawerToggle }) => {
  console.log("Button Clicked", handleDrawerToggle);
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "white", color: "black" }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => {
            handleDrawerToggle();
          }}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Metick
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
