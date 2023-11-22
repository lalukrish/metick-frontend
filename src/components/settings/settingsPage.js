import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { TextField, Button, Grid, Select, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel"; // Import InputLabel
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../Redux/slices/userProfileSlice";

const SettingsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfile()).then((response) => {
      console.log("hi", response);
    });
  }, []);

  const userData = useSelector(
    (state) => state.myprofile?.successMessage?.data?.user
  );

  const updateProfile = async (formikValues) => {
    console.log("submit");
    const id = localStorage.getItem("USER_ID");

    const response = await axios.put(
      `${process.env.REACT_APP_NEXTTECH_DEV_URL}/edit-profile
          `,
      {
        id,
        full_name: formikValues.full_name,
        role: formikValues.role,
        bio_information: formikValues.bio_information,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log("res");

    return response;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      full_name: userData ? userData.full_name : "",
      email: userData ? userData.email : "",
      user_name: userData ? userData.user_name : "",
      phone_number: userData ? userData.phone_number : "",
      country_code: userData ? userData.country_code : "",
      role: userData ? userData?.role : "",
      bio_information: userData ? userData.bio_information : "",
    },
    onSubmit: async () => {
      console.log("submit");

      updateProfile(formik.values).then((response) => {
        console.log("hi", response);
      });
    },
  });
  console.log("hi");

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={8} lg={12} sm={8}>
          <TextField
            placeholder="Full Name"
            name="full_name"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values ? formik.values.full_name : ""}
          />
        </Grid>
        <Grid item xs={8} lg={12} sm={8}>
          <TextField
            placeholder="Email"
            name="email"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values ? formik.values.email : ""}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            placeholder="User Name"
            name="user_name"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values ? formik.values.user_name : ""}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          {/* Label for the Role dropdown */}
          <InputLabel htmlFor="role" shrink={!!formik.values.role}>
            {formik.values.role ? "Role" : "Select your role"}
          </InputLabel>
          {/* Dropdown select for Role */}
          <Select
            id="role"
            name="role"
            value={formik.values?.role}
            onChange={(event) => {
              formik.handleChange(event); // Handle the change in Formik
              console.log("va;lue", event.target.value); // Log the selected role
            }}
            fullWidth
          >
            <MenuItem value="">
              <em>Select your role</em>
            </MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="Software Engineer">Software Engineer</MenuItem>
            <MenuItem value="React Developer">React Developer</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={3}>
          <Select
            name="country_code"
            value={formik.values ? formik.values.country_code : ""}
            onChange={formik.handleChange}
            fullWidth
          >
            <MenuItem value="+91">+1 (INDIA)</MenuItem>
            <MenuItem value="+44">+44 (UK)</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={9}>
          <TextField
            placeholder="Phone Number"
            name="phone_number"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values ? formik.values.phone_number : ""}
          />
        </Grid>{" "}
        <Grid item xs={12}>
          <TextField
            placeholder="Description"
            name="bio_information"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values ? formik.values.bio_information : ""}
            multiline
            rows={4}
          />
        </Grid>
        {/* ... Other fields */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ height: "50px" }}
            type="submit"
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SettingsPage;
