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
      <Formik onSubmit={Register} initialValues={initialValues}>
        {({ values, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            {status && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {status}
              </Alert>
            )}
            <Stack spacing={2}>
              <TextField
                name="full_name"
                placeholder="Full Name"
                onChange={handleChange}
                value={values.full_name}
              />
              <TextField
                name="user_name"
                placeholder="Username"
                onChange={handleChange}
                value={values.user_name}
              />
              <TextField
                name="email"
                placeholder="Email address"
                onChange={handleChange}
                value={values.email}
              />
              <TextField
                name="phone_number"
                placeholder="Phone Number"
                onChange={handleChange}
                value={values.phone_number}
              />
              <TextField
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
                // Add your value and any other props you need
              />

              <TextField
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
                // Add your value and any other props you need
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
