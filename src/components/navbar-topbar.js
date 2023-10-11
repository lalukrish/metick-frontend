// TopNavbar.js
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userProfilePicture } from "../Redux/slices/userProfileImage";

const TopNavbar = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleMenuItemClick = (action) => {
    if (action === "UserName") {
      navigate("/my-profile");
    } else if (action === "Settings") {
      navigate("/settings");
    }

    handleMenuClose();
  };
  const userProfileImage = useSelector(
    (state) => state.myprofilepic?.successMessage?.data?.data?.profile_image_url
  );
  const [profileImage, setProfileImage] = useState(userProfileImage);
  const handleProfileImage = () => {
    dispatch(userProfilePicture()).then((response) => {
      const data = response.payload.data.data.profile_image_url;
      console.log("res", data);

      setProfileImage(data);
    });
  };

  useEffect(() => {
    handleProfileImage();
  }, []);

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "white", color: "black" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Metick
          </Typography>
          <IconButton color="inherit" onClick={handleMenuClick}>
            <Avatar alt="Profile" src={profileImage} />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleMenuItemClick("UserName")}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("Settings")}>
              Settings
            </MenuItem>
            {/* Add more menu items as needed */}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopNavbar;
