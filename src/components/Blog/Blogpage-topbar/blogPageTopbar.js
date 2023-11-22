import { React, useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  Modal,
  Typography,
  Button,
  TextField,
  IconButton,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add"; // Import the Add icon
import WorkIcon from "@mui/icons-material/Work"; // Import the Work icon
import BookIcon from "@mui/icons-material/Book"; // Import the Book icon

import axios from "axios";
import { Link } from "react-router-dom";

const SimpleCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const textFieldRef = useRef(null);
  const handleSearch = () => {
    const config = {
      url: `${process.env.REACT_APP_NEXTTECH_DEV_URL}/admin/get-userby-username?user_name=${searchQuery}`,
      method: "get",
      headers: {},
    };
    axios(config)
      .then((response) => {
        const data = response.data.user_details;
        setSearchResults(data);
        setAnchorEl(textFieldRef.current); // Assuming you have an element with id 'search-input'
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleClosePopper = () => {
    // Close the Popper when clicking outside of it
    setAnchorEl(null);
  };
  useEffect(() => {
    // Add an event listener to the body to close the Popper when clicking outside of it
    const handleBodyClick = (event) => {
      if (anchorEl && !anchorEl.contains(event.target)) {
        handleClosePopper();
      }
    };

    document.body.addEventListener("click", handleBodyClick);
    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, [anchorEl]);

  return (
    <div>
      <Card
        style={{ width: "100%", paddingTop: "25.25%", position: "relative" }}
      >
        <CardContent
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextField
                variant="outlined"
                label="Search"
                style={{ width: "70%", marginRight: "10px", marginTop: "10px" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                inputRef={textFieldRef} // Assign the ref to the TextField
                id="search-input"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
            {/* Display search results in a Popper */}
            <Popper
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              placement="bottom-start"
              onClose={handleClosePopper}
            >
              <Paper style={{ width: textFieldRef.current?.offsetWidth }}>
                {searchResults.length === 0 ? (
                  <List>
                    <ListItem>No users found</ListItem>
                  </List>
                ) : (
                  <List style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {searchResults.map((result) => (
                      <ListItem key={result.user_name}>
                        <Link
                          to={`/user-profile/${result?._id}`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            alt={result.user_name}
                            src={result.profile_image_url}
                            style={{ marginRight: "10px" }}
                          />
                          <div>
                            <ListItemText
                              primary={result.user_name}
                              secondary={result.role}
                            />
                          </div>
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Paper>
            </Popper>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  height: "70px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  textDecoration: "none",
                }}
                component="a"
                href="/addpost"
              >
                <IconButton
                  color="primary"
                  size="small"
                  style={{ marginRight: "10px" }}
                >
                  <AddIcon fontSize="small" style={{ color: "white" }} />
                </IconButton>
                Add Post
              </Button>

              <Button
                variant="contained"
                size="medium"
                color="primary"
                style={{ marginLeft: "14px", height: "70px" }}
              >
                <IconButton color="primary" size="small">
                  <AddIcon fontSize="small" style={{ color: "white" }} />
                </IconButton>
                Single Line
              </Button>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                style={{ marginLeft: "16px", height: "70px" }}
              >
                <IconButton color="primary" size="small">
                  <WorkIcon fontSize="small" style={{ color: "white" }} />
                </IconButton>
                Work Job
              </Button>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                style={{ marginLeft: "18px", height: "70px" }}
              >
                <IconButton color="primary" size="small">
                  <BookIcon fontSize="small" style={{ color: "white" }} />
                </IconButton>
                VBook
              </Button>

              <NotificationsIcon
                style={{
                  fontSize: "40px",
                  marginLeft: "38px",
                  color: "blue",
                  cursor: "pointer",
                }}
                onClick={openModal}
              />

              <Avatar
                alt="User Avatar"
                src="/avatar.jpg"
                size="large"
                sx={{ marginLeft: "50px", weight: "70px", height: "50px" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Modal open={isModalOpen} onClose={closeModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            outline: "none",
          }}
        >
          <Typography variant="h5">Notifications</Typography>
          {/* Add your notification content here */}
          <Button variant="contained" color="primary" onClick={closeModal}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SimpleCard;
