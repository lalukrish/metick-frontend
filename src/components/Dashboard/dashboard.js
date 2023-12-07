import React, { useEffect, useState } from "react";
import AppWidgetSummary from "./DashboardComponents/appWidgetScreen";
import { Container, Grid, Typography } from "@mui/material";
import IconReact from "../icons/icon-react";
import IconHtml from "../icons/icon-html";
import IconExpress from "../icons/Icon-express";
import IconCss from "../icons/icon-css";
import axios from "axios";

const Dashboard = () => {
  const userId = localStorage.getItem("USER_ID");
  const [registeredCourse, setRegisteredCourse] = useState([]);

  const [reactUserCount, setReactUserCount] = useState();
  const [htmlUserCount, setHtmlUserCount] = useState();
  const [cssUserCount, setCssUserCount] = useState();
  const [nodejsUserCount, setNodejsUserCount] = useState();

  useEffect(() => {
    const config = {
      method: "get",
      url: `${process.env.REACT_APP_NEXTTECH_DEV_URL}/career/get-all-registered-course/${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(config).then((response) => {
      const data = response.data;
      console.log("data", data);
      setRegisteredCourse(response.data.userCourses);
      setReactUserCount(response.data.counts.react);
      setHtmlUserCount(response.data.counts.html);
      setCssUserCount(response.data.counts.css);
      setNodejsUserCount(response.data.counts.nodejs);
    });
  }, []);

  return (
    <div>
      <h1>Dashboard Page</h1>
      <Container maxWidth="lg">
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography> */}

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={8}>
            <AppWidgetSummary
              title="React"
              total={reactUserCount}
              icon={IconReact}
              color="#FFE7D9"
              course="react"
              registeredCourse={registeredCourse}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={8}>
            <AppWidgetSummary
              title="Html"
              total={htmlUserCount}
              icon={IconHtml}
              color="#D1E9FC"
              course="html"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={8}>
            <AppWidgetSummary
              title="Node js"
              total={nodejsUserCount}
              color="#D0F2FF;"
              icon={IconExpress}
              course="nodejs"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={8}>
            <AppWidgetSummary
              title="CSS"
              total={cssUserCount}
              color=" #FFF7CD"
              icon={IconCss}
              course="css"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
