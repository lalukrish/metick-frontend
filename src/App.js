import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isSignupOrLoginPage =
    window.location.pathname === "/signup" ||
    window.location.pathname === "/login";

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
            <Route path="/*" element={<BlogPage />} />
            <Route path="/start-career" element={<Dashboard />} />
            <Route path="/latest-you-go" element={<LatestYouGo />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<Signin />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
