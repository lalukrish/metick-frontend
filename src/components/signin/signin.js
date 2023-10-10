import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Button,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UserSignin } from "../../Redux/slices/userSigninSlice";

const Signin = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const singinResponseId = useSelector(
    (state) => state?.signin?.successMessage?.user?._id
  );
  console.log("res", singinResponseId);
  localStorage.setItem("USER_ID", singinResponseId);

  const singinResponseMessage = useSelector(
    (state) => state?.signin?.successMessage?.message
  );
  console.log("res", singinResponseMessage);

  const Login = (values) => {
    setUserData(values);
    dispatch(UserSignin(values)).then((response) => {
      const data = response;
      const resMessage = data.payload.data.message;
      console.log("data", data);
      if (resMessage === "Login successfull") {
        navigate("/");
      }
    });
  };

  return (
    <Grid container spacing={4}>
      {/* Left Column (Image) */}
      <Grid item xs={12} md={6}>
        <img
          src="https://imgs.search.brave.com/OOteqHb4EgQ-ZXi955JQHceJjDx1BgVOcRif_ioT--8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/MzE0MTEyMDc3NzQt/ZGEzYzczMTFiNWU4/P2l4bGliPXJiLTQu/MC4zJml4aWQ9TTN3/eE1qQTNmREI4TUh4/elpXRnlZMmg4TWpC/OGZHNWhkSFZ5WVd4/OFpXNThNSHg4TUh4/OGZEQT0mdz0xMDAw/JnE9ODA" // Replace with the actual image path
          alt="Your Image"
          style={{ width: "100%", height: "auto" }}
        />
      </Grid>

      {/* Right Column (Form) */}
      <Grid item xs={12} md={6}>
        <Formik onSubmit={Login} initialValues={initialValues}>
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  name="email"
                  placeholder="Email/Username"
                  onChange={handleChange}
                  value={values.formik}
                />

                <TextField
                  required
                  name="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  value={values.formik}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ my: 2 }}
              >
                <Checkbox name="remember" label="Remember me" />
                <Link variant="subtitle2" underline="hover">
                  Forgot password .?
                </Link>
              </Stack>

              <Button fullWidth size="large" type="submit" variant="contained">
                Login
              </Button>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};
export default Signin;
