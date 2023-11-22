import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const UserEducationProfile = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={3}
      border="1px solid #ccc"
      borderRadius={4}
      boxShadow={1}
      maxWidth="600px" // Updated maxWidth to 600px
      margin="0 auto"
    >
      <Typography variant="h6">Education</Typography>
      <Typography variant="body1">educ 1</Typography>
      <Typography variant="body1">educ 2</Typography>
      <Typography variant="body1">educ 3</Typography>
      {/* Add more skills as needed */}
    </Box>
  );
};
export default UserEducationProfile;
