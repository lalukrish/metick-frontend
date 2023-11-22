import React from "react";
import PropTypes from "prop-types";
import { Card, Typography, Box, useTheme } from "@mui/material";
import { Link } from "react-router-dom"; // Import the Link component

export default function AppWidgetSummary({
  title,
  total,
  icon,
  color = "info",
  sx,
  ...other
}) {
  const theme = useTheme();

  const MuiIcon = icon ? React.createElement(icon, { component: icon }) : null;

  return (
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
      <Link to="/course-details">
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
        >
          {MuiIcon}
        </Box>
      </Link>

      <Typography variant="h3" sx={{ color: "black" }}>
        {total}
      </Typography>

      <Typography variant="subtitle2" sx={{ color: "black" }}>
        {title}
      </Typography>
    </Card>
  );
}
