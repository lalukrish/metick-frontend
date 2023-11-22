import {
  Avatar,
  Backdrop,
  Box,
  CardContent,
  CircularProgress,
  Card,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import React, { useEffect, useState } from "react";
import { userProfilePicture } from "../../Redux/slices/userProfileImage";
import EditProfileService from "./service/proiflepicService";

const EditProfilePicture = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("USER_ID");
  const [image, setImage] = useState();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();

    formData.append("image", image);
    formData.append("id", userId);

    // Upload the image and update the profile image URL in the state
    EditProfileService(formData).then((response) => {
      const data = response;
      const imageUrl = data.data.profile_image_url;
      handleProfileImage(); // Update the profile image URL
    });
  };

  // const handleProfileImage = () => {
  //   const config = {
  //     method: 'get',
  //     url: `${process.env.REACT_APP_NEXTTECH_DEV_URL}/get-user-profile-image/${userId}`,
  //     headers: {
  //       accept: 'application/json',
  //     },
  //   };
  //   axios(config).then((response) => {
  //     const data = response.data;
  //     const imageUrl = data.data.profile_image_url;
  //     setProfileImage(imageUrl); // Update the profile image URL
  //   });
  // };

  const [profileImage, setProfileImage] = useState(null);

  const handleProfileImage = () => {
    dispatch(userProfilePicture()).then((response) => {
      const data = response.payload.data.data.profile_image_url;
      console.log("res", data);

      setProfileImage(data);
    });
  };

  useEffect(() => {
    handleProfileImage();
  }, []);

  const userProfileImage = useSelector(
    (state) => state.myprofilepic?.successMessage?.data?.data?.profile_image_url
  );
  console.log("userProfileImage----->", userProfileImage);
  console.log("the valueis 1", profileImage);

  return (
    <>
      <Card
        style={{
          position: "relative",
          width: 160,
          padding: 5,
          boxShadow: "1px 3px 6px rgba(0, 0, 0, 0.16)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          <CardContent>
            Update Profile Image
            <Box
              sx={{
                alignItems: "center", // Center vertically
                display: "flex",
                flexDirection: "column",
                position: "relative",
                minHeight: "30vh", // Adjust the height as needed
              }}
            >
              <CardContent>
                <div style={{ position: "relative" }}>
                  {/* Rest of your Avatar and IconButton code */}
                </div>
              </CardContent>

              <div style={{ position: "relative" }}>
                <Avatar
                  src={profileImage}
                  sx={{
                    height: 100,
                    backgroundColor: "black",
                    width: 100,
                  }}
                  alt="no image"
                />

                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: -10,
                  }}
                >
                  <input
                    hidden
                    name="avatar"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <CameraAltIcon />
                </IconButton>
              </div>
            </Box>
          </CardContent>
          <Button type="submit" color="primary">
            update
          </Button>
        </form>
      </Card>
    </>
  );
};

export default EditProfilePicture;
