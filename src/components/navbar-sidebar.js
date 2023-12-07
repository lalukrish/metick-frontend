import React, { useEffect, useState } from "react";
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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
const DrawerList = () => {
  const dispatch = useDispatch();

  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (mainItem) => {
    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [mainItem]: !prevExpandedItems[mainItem],
    }));
  };

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
          { mainItem: "blog-page", subItems: [] },
          { mainItem: "organization", subItems: [] },
          {
            mainItem: "platform",
            subItems: ["Technology", "marketing", "Movies", "Designer"],
          },
          {
            mainItem: "latest-you-go",
            subItems: ["Market", "Crypto", "credits"],
          },
          { mainItem: "my-profile", subItems: ["sub-item-7", "sub-item-8"] },
          // Add more main items and their sub-items as needed
        ].map((item, index) => (
          <React.Fragment key={item.mainItem}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  if (item.subItems && item.subItems.length > 0) {
                    toggleExpand(item.mainItem);
                  } else {
                    // Navigate to the desired page when there are no sub-items
                    // You can replace '/your-page' with the actual path
                    window.location.href = `/${item.mainItem.toLowerCase()}`;
                  }
                }}
                sx={{
                  backgroundColor: expandedItems[item.mainItem]
                    ? "#f0f0f0"
                    : "",
                }}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MenuIcon />}
                </ListItemIcon>
                <ListItemText primary={item.mainItem} />
                {item.subItems &&
                  item.subItems.length > 0 &&
                  (expandedItems[item.mainItem] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  ))}
              </ListItemButton>
            </ListItem>
            <Collapse
              in={expandedItems[item.mainItem]}
              timeout="auto"
              unmountOnExit
            >
              <List sx={{ paddingLeft: 4 }}>
                {item.subItems.map((subItem) => (
                  <ListItem key={subItem} disablePadding>
                    <ListItemButton
                      component={Link}
                      to={`/${item.mainItem.toLowerCase()}/${subItem.toLowerCase()}`}
                    >
                      <ListItemIcon>
                        <ArrowForwardIcon />
                      </ListItemIcon>
                      <ListItemText primary={subItem} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
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
