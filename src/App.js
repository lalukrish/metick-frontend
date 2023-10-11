import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { Box, CssBaseline, Toolbar, useMediaQuery } from "@mui/material";
import TopNavbar from "./components/navbar-topbar";
import SideNavbar from "./components/navbar-sidebar";
import Dashboard from "./components/Dashboard/dashboard";
import BlogPage from "./components/Blog/blog";
import LatestYouGo from "./components/LatestYouGo/latest-you-go";
import MyProfile from "./components/MyProfile/my-profile";
import SignupPage from "./components/signup/signup";
import Signin from "./components/signin/signin";
const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSignupOrLoginPage, setIsSignupOrLoginPage] = useState(
    window.location.pathname === "/signup" || window.location.pathname === "/"
  );
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    // Update the state based on the current location
    const currentPath = window.location.pathname;
    setIsSignupOrLoginPage(currentPath === "/signup" || currentPath === "/");
  }, [isSignupOrLoginPage]);

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {!isSignupOrLoginPage && (
          <>
            <TopNavbar handleDrawerToggle={handleDrawerToggle} />
            <SideNavbar
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
            />
          </>
        )}
        <Box
          component="main"
          sx={{
            marginLeft: isSignupOrLoginPage ? 0 : isSmallScreen ? 0 : 30,
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/blog-page" element={<BlogPage />} />
            <Route path="/start-career" element={<Dashboard />} />
            <Route path="/latest-you-go" element={<LatestYouGo />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/*" element={<Signin />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
