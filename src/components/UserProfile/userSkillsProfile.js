import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const UserSkillsProfile = () => {
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
      <Typography variant="h6">Skills</Typography>
      <Typography variant="body1">Skill 1</Typography>
      <Typography variant="body1">Skill 2</Typography>
      <Typography variant="body1">Skill 3</Typography>
      {/* Add more skills as needed */}
    </Box>
  );
};

export default UserSkillsProfile;
