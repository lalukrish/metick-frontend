import React, { useEffect } from "react";
import {
  Drawer,
  useMediaQuery, // Add this import
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { userProfile } from "../Redux/slices/userProfileSlice";
import { useDispatch, useSelector } from "react-redux";

const DrawerList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfile()).then((response) => {
      console.log("hi", response);
    });
  }, []);

  const userName = useSelector(
    (state) => state.myprofile?.successMessage?.data?.user?.user_name
  );
  console.log("userProfileDetails", userName);
  return (
    <>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ marginLeft: 2, marginTop: 2, fontWeight: 600 }}
      >
        Metick
      </Typography>

      <Divider />
      <Typography
        gutterBottom
        sx={{ marginLeft: 2, fontWeight: "20px", mt: 2 }}
      >
        {userName}
      </Typography>
      <Divider />
      <List sx={{ marginTop: 10 }}>
        {[
          "blog-page",
          "start-career",
          "latest-you-go",
          "my-profile",
          // "login",
          // "signup",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={`/${text.toLowerCase()}`}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MenuIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

const SideNavbar = ({ mobileOpen, handleDrawerToggle }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Box>
      {isSmallScreen && (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 240,
              },
            }}
          >
            <>
              <DrawerList />
              <Divider />
            </>
          </Drawer>
        </>
      )}

      {!isSmallScreen && (
        <Drawer
          variant="permanent"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          <>
            <DrawerList />
            <Divider />
          </>
        </Drawer>
      )}
    </Box>
  );
};

export default SideNavbar;
