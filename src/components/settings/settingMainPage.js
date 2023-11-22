import React from "react";
import EditProfilePicture from "./edit-profilePicture";
import SettingsPage from "./settingsPage";
import { Grid, Typography } from "@mui/material";

const SettingMainPage = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ marginRight: "140px" }}>
        <center>Account Settings</center>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <SettingsPage />
        </Grid>

        <Grid item xs={12} md={4}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div>
              <EditProfilePicture />
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default SettingMainPage;
