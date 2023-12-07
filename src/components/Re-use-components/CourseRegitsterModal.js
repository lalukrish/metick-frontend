import {
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CourseRegitsterModal = ({
  modalOpen,
  handleModalClose,
  title,
  total,
  course,
}) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("USER_ID");

  const handleCommentModalClose = () => {
    handleModalClose();
  };

  const handleRegisterClick = () => {
    const config = {
      method: "post",
      url: `${process.env.REACT_APP_NEXTTECH_DEV_URL}/career/register-course-tech`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        course_name: course,
        title: title,
        userId: userId,
      },
    };
    axios(config).then((response) => {
      const data = response.data;
      console.log("data", data);
    });
  };
  const handleEnterCourse = () => {
    handleRegisterClick();
    navigate(`/${course}`);
  };
  return (
    <div>
      <Dialog
        open={modalOpen}
        onClose={handleCommentModalClose}
        fullWidth
        sx={{ height: "600px" }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogContent>
          <Card sx={{ height: "600px", overflowY: "auto" }}>
            <CardContent>
              {/* Title */}
              <Typography variant="h5" component="div" gutterBottom>
                Your Title:{title}
              </Typography>

              {/* Total Information */}
              <Typography variant="body1" paragraph>
                Total:{total}
              </Typography>

              {/* Content */}
              {/* Add your content here */}

              {/* Button */}

              <Button
                variant="contained"
                color="primary"
                onClick={handleEnterCourse}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseRegitsterModal;
