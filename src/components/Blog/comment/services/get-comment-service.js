import axios from "axios";
import React from "react";

const GetCommentService = async (postId) => {
  try {
    const allComment = await axios.get(
      `${process.env.REACT_APP_NEXTTECH_DEV_URL}/comments/get-comment/${postId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return allComment;
  } catch (error) {
    console.log("error", error);
    ///return error;
  }
};

export default GetCommentService;
