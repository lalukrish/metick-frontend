import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CssBaseline, Toolbar, useMediaQuery } from "@mui/material";
import TopNavbar from "./components/navbar-topbar";
import SideNavbar from "./components/navbar-sidebar";
import Dashboard from "./components/Dashboard/dashboard";
import BlogPage from "./components/Blog/blog";
import LatestYouGo from "./components/LatestYouGo/latest-you-go";
import MyProfile from "./components/MyProfile/my-profile";
import SignupPage from "./components/signup/signup";
import Signin from "./components/signin/signin";
import SettingsPage from "./components/settings/settingsPage";
import SettingMainPage from "./components/settings/settingMainPage";
import UserProfilePage from "./components/UserProfile/userProfilePage";
import CourseDetailsPage from "./components/Courses/course-details-page";
import "./App.css";
import CourseNnodejs from "./components/Courses/course-nodejs";
import CourseReact from "./components/Courses/course-react";
// ... (imports remain unchanged)

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const shouldRenderNavbars = !["/login", "/signup"].includes(
    window.location.pathname
  );

  return (
    <div className="App">
      <Router>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          {shouldRenderNavbars && (
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
              marginLeft: !shouldRenderNavbars ? 0 : isSmallScreen ? 0 : 30,
            }}
          >
            <Toolbar />
            <Routes>
              <Route path="/login" element={<Signin />} />
              <Route path="/blog-page" element={<BlogPage />} />

              <Route path="/platform/Technology" element={<Dashboard />} />
              <Route path="/latest-you-go" element={<LatestYouGo />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="" element={<Signin />} />
              <Route path="/settings" element={<SettingMainPage />} />

              <Route path="/user-profile/:id" element={<UserProfilePage />} />
              <Route path="/course-details" element={<CourseDetailsPage />} />
              <Route path="/nodejs" element={<CourseNnodejs />} />

              <Route path="/react" element={<CourseReact />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </div>
  );
};

export default App;
