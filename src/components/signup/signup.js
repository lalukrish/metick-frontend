import React from "react";
import {
  Link,
  Container,
  Typography,
  TextField,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import SingupForm from "./signupForm";

export default function SignupPage() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        mt: 5,
      }}
    >
      {/* Image Box (Visible on larger screens) */}
      {!isSmallScreen && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: (theme) => theme.palette.background.default,
            padding: (theme) => theme.spacing(5),
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Stop Wasting Time !! <>Explore Technology</>
          </Typography>

          <Box
            sx={{
              width: "100%",
              height: "500px",
              overflow: "hidden",
            }}
          >
            <img
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src="https://imgs.search.brave.com/uHJvjZ3jp166fnWT7tUkV8F-htgCeM2vPUQHxOilT1M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9jb25jZXB0LWVs/ZWN0cm9uaWMtbGVh/cm5pbmctbGVhcm5p/bmctb25saW5lLXRo/cm91Z2gtd2ViaW5h/cnMtdmlkZW8tdHV0/b3JpYWxzLWludGVy/bmV0LWNvdXJzZXNf/Mjc2MzQtOTIwLmpw/Zz9zaXplPTYyNiZl/eHQ9anBn"
              alt="login"
            />
          </Box>
        </Box>
      )}

      {/* Signup Form Box */}
      <Box
        sx={{
          flex: 1,
          maxWidth: isSmallScreen ? "100%" : "480px",
          margin: "auto",
          padding: (theme) => theme.spacing(5),
          mt: 5,
        }}
      >
        <SingupForm />
      </Box>
    </Box>
  );
}
