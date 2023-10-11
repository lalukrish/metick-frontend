import {
  Avatar,
  Button,
  CardContent,
  CardActions,
  CardHeader,
  IconButton,
  Typography,
  Modal,
  Card,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import {
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  ReplyOutlined as ReplyOutlinedIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { format, parseISO } from "date-fns";
import GetCommentService from "./comment/services/get-comment-service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MyPostCardModal = ({ modalOpen, handleModalClose, postId }) => {
  console.log("postmodal,", postId);
  const userId = localStorage.getItem("USER_ID");
  console.log("post------>id", postId);
  const userName = useSelector(
    (state) => state.myprofile?.successMessage?.data?.user?.user_name
  );

  const userProfileImage = useSelector(
    (state) => state.myprofilepic?.successMessage?.data?.data?.profile_image_url
  );
  const [profileImage, setProfileImage] = useState(userProfileImage);

  // Use useEffect to update profileImage when userProfileImage changes
  useEffect(() => {
    setProfileImage(userProfileImage);
  }, [userProfileImage]); // This dependency array ensures the effect runs when userProfileImage changes

  const [post, allPost] = useState();
  const handleSinglePost = () => {
    // Check if postId is not null before making the request
    if (postId !== null) {
      const config = {
        method: "get",
        url: `${process.env.REACT_APP_NEXTTECH_DEV_URL}/get-one-post/${postId}`,
        headers: {},
      };

      axios(config)
        .then((response) => {
          const data = response.data.post;
          allPost(data);
        })
        .catch((error) => {
          console.error("Error occurred in handleSinglePost:", error);
          // Handle the error, e.g., show an error message to the user
        });
    } else {
      console.error("postId is null. Cannot make the request.");
      // Handle the case where postId is null, e.g., show an error message to the user
    }
  };

  const handleCommentModalClose = () => {
    handleModalClose();
    allPost(null);
    setComment([]);
  };

  const [comment, setComment] = useState([]);

  const handleCommentOfPost = () => {
    GetCommentService(postId).then((response) => {
      try {
        const data = response.data.comments;
        console.log("comments", data);
        setComment(data);
      } catch (error) {
        console.log("error occured");
      }
    });
  };

  useEffect(() => {
    handleSinglePost();
    handleCommentOfPost();
  }, [postId]);

  const [text, setText] = useState("");
  const handlePostComment = () => {
    const config = {
      method: "post",
      url: `${process.env.REACT_APP_NEXTTECH_DEV_URL}/comments/add-comment`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        postid: postId,
        userid: userId,
        text,
      },
    };

    axios(config).then((response) => {
      const data = response.data;
      console.log("data", data);
      handleCommentOfPost();
      setText("");
    });
  };
  const [showReplies, setShowReplies] = useState({}); // State to control showing/hiding sub-replies
  // Toggle showing/hiding sub-replies
  const toggleShowReplies = (commentId) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };
  // Function to format updated time and date
  const formatUpdatedTime = (updatedTime) => {
    if (updatedTime) {
      const formattedTime = format(parseISO(updatedTime), "MMM d, yyyy h:mm a"); // Format includes time
      return `${formattedTime}`;
    }
    return "";
  };

  const [postLikes, setPostLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikePost = () => {
    if (isLiked) {
      setPostLikes(postLikes - 1);
      setIsLiked(false);
    } else {
      setPostLikes(postLikes + 1);
      setIsLiked(true);
    }
  };
  const [replyText, setReplyText] = useState();
  const handleReplyComment = (commentId) => {
    const replyData = {
      commentId,
      userId,
      reply_text: replyText, // Get reply text based on commentId
    };

    const config = {
      method: "post",
      url: `${process.env.REACT_APP_NEXTTECH_DEV_URL}/comments/add-reply`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(replyData),
    };

    axios(config)
      .then((response) => {
        handleCommentOfPost();
        setReplyText((prevState) => ({
          ...prevState,
          [commentId]: "", // Clear the reply text after posting
        }));
        setReplyText("");
      })
      .catch((error) => {
        console.error("Error posting reply:", error);
      });
  };

  return (
    <div>
      <Dialog
        open={modalOpen}
        onClose={handleCommentModalClose}
        maxWidth="lg"
        fullWidth
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <DialogTitle id="modal-modal-title">Posts</DialogTitle> */}
        <DialogContent>
          <div style={{ display: "flex" }}>
            <Card style={{ flex: 1, marginRight: "20px" }}>
              {" "}
              <CardHeader
                avatar={<Avatar src={profileImage} alt={post?.username} />}
                title={userName}
              />
              <CardContent>
                {post ? (
                  <>
                    <img
                      src={post?.image_url}
                      alt="Post"
                      style={{ width: "100%", maxHeight: "600px" }}
                    />
                    <Typography>{post?.description}</Typography>
                  </>
                ) : (
                  <p>No post to display</p>
                )}
              </CardContent>
              <CardActions>
                <IconButton color="primary" onClick={handleLikePost}>
                  <FavoriteBorderOutlinedIcon
                    color={isLiked ? "primary" : "inherit"}
                  />
                </IconButton>
                {postLikes} Likes
              </CardActions>
            </Card>

            <Card style={{ flex: 1, maxHeight: "600px", overflowY: "auto" }}>
              <CardContent>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Add a comment"
                  placeholder="Add a comment..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handlePostComment}
                >
                  Post
                </Button>
                {comment.length === 0 ? (
                  <Typography>No comments to display</Typography>
                ) : (
                  comment.map((comments) => (
                    <div key={comments._id} style={{ marginBottom: "10px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "5px",
                        }}
                      >
                        {/* <Avatar src={comment.author.profileImage} alt={comment.author.username} /> */}
                        <Typography style={{ marginLeft: "10px" }}>
                          {comments.author.username}
                        </Typography>
                      </div>
                      <CardHeader
                        avatar={
                          <Avatar src={profileImage} alt={post?.username} />
                        }
                        title={userName}
                      />
                      <Typography>{comments.text}</Typography>
                      <div style={{ marginTop: "10px" }}>
                        <IconButton color="primary">
                          <FavoriteBorderOutlinedIcon /> {/* Like icon */}
                        </IconButton>
                        <IconButton color="secondary">
                          <ReplyOutlinedIcon
                            onClick={() => {
                              toggleShowReplies(comments._id);
                            }}
                          />{" "}
                          {/* Reply icon */}
                        </IconButton>
                        {formatUpdatedTime(comments.updatedAt)}
                        {comments.replies.length > 0 && (
                          <>
                            <IconButton
                              onClick={() => toggleShowReplies(comments._id)}
                              color="primary"
                              aria-label="expand replies"
                            >
                              {showReplies[comments._id] ? (
                                <ExpandLessIcon /> // Show collapse icon when replies are expanded
                              ) : (
                                <ExpandMoreIcon /> // Show expand icon when replies are collapsed
                              )}
                            </IconButton>
                            <Typography variant="caption">
                              {showReplies[comments._id]
                                ? "Collapse Replies"
                                : "See Replies"}
                            </Typography>
                          </>
                        )}
                      </div>
                      {/* Display sub-replies */}
                      {showReplies[comments._id] && (
                        <div>
                          <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Add a reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            InputProps={{
                              endAdornment: (
                                <IconButton
                                  color="primary"
                                  onClick={() =>
                                    handleReplyComment(comments._id)
                                  }
                                >
                                  <ReplyOutlinedIcon />{" "}
                                  {/* Replace with the Send icon */}
                                </IconButton>
                              ),
                            }}
                          />

                          {comments.replies.map((reply) => (
                            <div key={reply._id} style={{ marginLeft: "20px" }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "5px",
                                }}
                              >
                                {/* <Avatar src={reply.author.profileImage} alt={reply.author.username} /> */}
                                <Typography style={{ marginLeft: "10px" }}>
                                  {reply.author.username}
                                </Typography>
                              </div>

                              <CardHeader
                                avatar={
                                  <Avatar
                                    src={profileImage}
                                    alt={post?.username}
                                  />
                                }
                                title={userName}
                              />
                              <Typography sx={{ fontSize: "16px" }}>
                                {reply.reply_text}
                              </Typography>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyPostCardModal;
