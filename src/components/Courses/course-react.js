import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star"; // Import the star icon from Material-UI Icons
import PauseIcon from "@mui/icons-material/Pause"; // Import the pause icon from Material-UI Icons
//import { useHistory } from "react-router-dom"; // Import useHistory from react-router-dom

const concepts = [
  { name: "Component-Based Architecture", rating: 5 },
  { name: "Declarative Syntax", rating: 4 },
  { name: "Virtual DOM for Performance", rating: 5 },
  { name: "One-Way Data Binding", rating: 3 },
  { name: "Rich Ecosystem", rating: 4 },
  { name: "Community Support", rating: 5 },
  { name: "Backed by Facebook", rating: 5 },
  // Add more concepts as needed
];

const CourseReact = () => {
  const numberOfPeopleUsingReact = 0;
  //  const history = useHistory(); // Use history from react-router-dom for redirection

  const handlePauseClick = () => {
    // Redirect to the next page when the pause icon is clicked
    //   history.push("/next-page"); // Replace "/next-page" with the actual path
  };

  return (
    <div>
      <h1>React Overview</h1>
      <p>
        React is an open-source JavaScript library developed and maintained by
        Facebook. It is commonly used for building user interfaces, especially
        for creating interactive and dynamic web applications.
      </p>

      <h2>How React Works</h2>

      {/* Display 10 boxes with different React concepts */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {concepts.map((concept, index) => (
          <Box
            key={index}
            sx={{
              border: 1,
              borderRadius: 8,
              padding: 2,
              margin: 2,
              minWidth: 150,
              minHeight: 100,
              maxWidth: 200,
              textAlign: "center",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: 5, right: 5 }}>
              {/* Round icon (star) */}
              <StarIcon color="primary" />
            </div>
            <Typography variant="h6">{concept.name}</Typography>
            <Typography variant="body1">Rating: {concept.rating}</Typography>
            <Button onClick={handlePauseClick} style={{ marginTop: 10 }}>
              {/* Round icon (pause) */}
              <PauseIcon color="secondary" />
            </Button>
          </Box>
        ))}
      </div>

      {/* "Get Started" Button */}
      {/* <Button variant="contained" color="primary">
        Get Started
      </Button> */}

      {/* Number of People using React */}
      {/* <Typography variant="body1">
        People doing: {numberOfPeopleUsingReact}
      </Typography> */}
    </div>
  );
};

export default CourseReact;
