import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Typography, Box, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Import the Link component
import CourseRegitsterModal from "../../Re-use-components/CourseRegitsterModal";
import axios from "axios";

export default function AppWidgetSummary({
  title,
  course,
  total,
  icon,
  color = "info",
  sx,
  registeredCourse,
  ...other
}) {
  const theme = useTheme();
  const MuiIcon = icon ? React.createElement(icon, { component: icon }) : null;
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleModalOpen = () => {
    if (Array.isArray(registeredCourse)) {
      // Check if the course is registered
      const isCourseRegistered = registeredCourse.some(
        (registered) => registered.course_name === course
      );

      if (isCourseRegistered) {
        // Redirect to the course page
        navigate(`/${course}`);
      }
    } else {
      setModalOpen(true);
    }
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <CourseRegitsterModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        title={title}
        total={total}
        course={course}
      />
      <Card
        sx={{
          py: 5,
          boxShadow: 0,
          textAlign: "center",
          color: color,
          bgcolor: color,
          border: `2px solid `,
          width: "100%", // Set full width
          margin: "auto", // Center the card
          [theme.breakpoints.up("sm")]: {
            flexBasis: "calc(60% - 156px)", // Increase the width for larger screens
          },
          ...sx,
        }}
        {...other}
      >
        {/* <Link to={`/${course}`}> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            width: 64,
            height: 64,
            margin: "auto",
            marginBottom: 3,
            color: "#103996",
            backgroundColor: "#10399624",
            boxShadow: "##919EAB20",
          }}
          onClick={handleModalOpen}
        >
          {MuiIcon}
        </Box>
        {/* </Link> */}

        <Typography variant="h3" sx={{ color: "black" }}>
          {total}
        </Typography>

        <Typography variant="subtitle2" sx={{ color: "black" }}>
          {title}
        </Typography>
      </Card>
    </>
  );
}
