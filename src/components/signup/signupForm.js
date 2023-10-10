import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Button,
  Alert,
  Grid,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { SignupUser } from "../../Redux/slices/userSingupSlice";

const SingupForm = () => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    full_name: "",
    user_name: "",
    country_code: 1,
    email: "",
    password: "",
    phone_number: "",
  };
  const [status, setStatus] = useState("");

  const Register = async (values, { setStatus }) => {
    try {
      const response = await dispatch(SignupUser(values));

      if (
        response.payload &&
        response.payload.data &&
        response.payload.data.message
      ) {
        // Update the status with the response message
        setStatus(response.payload.data.message);
        // Optionally, you can reset the form on successful signup
        // resetForm();
      } else if (response.payload && response.payload.message) {
        setStatus(response.payload.message);
      }
    } catch (error) {
      console.error("Signup failed", error);
      setStatus("Signup failed. Please try again."); // Set an error message
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Typography variant="body2" sx={{ mb: 5 }}>
        you already have an account.? {""}
        <Link href="login" variant="subtitle2">
          Get started
        </Link>
      </Typography>
      <Formik onSubmit={Register} initialValues={initialValues}>
        {({ values, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            {status && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {status}
              </Alert>
            )}
            <Stack spacing={2} sx={{ mb: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={12}>
                  <TextField
                    name="full_name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    value={values.full_name}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={12}>
                  <TextField
                    name="user_name"
                    placeholder="Username"
                    onChange={handleChange}
                    value={values.user_name}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={12}>
                  <TextField
                    name="email"
                    placeholder="Email address"
                    onChange={handleChange}
                    value={values.email}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={12}>
                  <TextField
                    name="phone_number"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    value={values.phone_number}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <TextField
                    fullWidth
                    name="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
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
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <TextField
                    fullWidth
                    name="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
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
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <Checkbox name="remember" label="Remember me" />
              <Link variant="subtitle2" underline="hover">
                Forgot password?
              </Link>
            </Stack>

            <Button fullWidth size="large" type="submit" variant="contained">
              Signup
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SingupForm;
