import React from "react";
import AppWidgetSummary from "./DashboardComponents/appWidgetScreen";
import { Container, Grid, Typography } from "@mui/material";
import IconReact from "../icons/icon-react";
import IconHtml from "../icons/icon-html";
import IconExpress from "../icons/Icon-express";
import IconCss from "../icons/icon-css";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard Page</h1>
      <Container maxWidth="lg">
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography> */}

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="React"
              total={714000}
              icon={IconReact}
              color="#FFE7D9"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Html"
              total={1000}
              icon={IconHtml}
              color="#D1E9FC"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Node js"
              total={17233154444}
              color="#D0F2FF;"
              icon={IconExpress}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="CSS"
              total={234}
              color=" #FFF7CD"
              icon={IconCss}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
