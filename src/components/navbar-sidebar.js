import React from "react";
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

const DrawerList = () => {
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
        Mahin
      </Typography>
      <Divider />
      <List sx={{ marginTop: 10 }}>
        {["blog", "start-career", "latest-you-go", "my-profile"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={`/${text.toLowerCase()}`}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MenuIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
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
