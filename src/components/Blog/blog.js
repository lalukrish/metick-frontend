import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import MyPostCardModal from "./blog-post-fullVIew-modal";
import {
  Favorite as FavoriteIcon,
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  AddComment,
} from "@mui/icons-material";
const BlogPage = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem("USER_ID");
  const userName = useSelector(
    (state) => state.myprofile?.successMessage?.data?.user?.user_name
  );

  const userProfileImage = useSelector(
    (state) => state.myprofilepic?.successMessage?.data?.data?.profile_image_url
  );
  const [profileImage, setProfileImage] = useState(userProfileImage);

  useEffect(() => {
    setProfileImage(userProfileImage);
  }, [userProfileImage]);
  const [likedList, setAllLikedList] = useState([]);
  const [post, allPost] = useState([]);
  const [isLikedMap, setIsLikedMap] = useState({});

  const handleAllPosts = () => {
    const config = {
      method: "get",
      url: `${process.env.REACT_APP_NEXTTECH_DEV_URL}/get-all-posts`,
      headers: {},
    };
    axios(config).then((response) => {
      const data = response.data.posts;

      console.log("all post", data);
      allPost(data);
      const likedMap = {};
      data.forEach((post) => {
        likedMap[post._id] = post.likedBy.includes(userid);
      });
      setIsLikedMap(likedMap);
    });
  };

  useEffect(() => {
    handleAllPosts();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const [postId, setPostId] = useState();
  console.log("im here", postId);
  const handleValue = (postId) => {
    setPostId(postId.id);
  };

  console.log("postid______>", postId);

  const [postLikes, setPostLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Define a function to send a POST request to the API to like a post
  const handleLikePostApi = (postId) => {
    console.log("im inside ()", postId);
    const data = {
      userid,
      postid: postId,
    };

    const config = {
      method: "post",
      url: `${process.env.REACT_APP_NEXTTECH_DEV_URL}/comments/add-like`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };

    axios(config)
      .then((response) => {
        if (response.data.success) {
          setIsLiked(true);
        }
      })
      .catch((error) => {
        console.error("Error liking the post:", error);
      });
  };

  // const handlegetAllLikes=()=>{
  //   GetAllLikesServices()
  // }

  const handleLikePost = () => {
    if (isLiked) {
      setIsLiked(false);
    } else {
      handleLikePostApi();
    }
  };

  const handleProfileRoute = (userId) => {
    console.log("udsusds", userId);

    navigate("/dashboard/user-profile");
  };

  return (
    <>
      <MyPostCardModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        postId={postId}
      />

      <div style={{ marginTop: 6 }}>
        {/* <Typography variant="h5">Posts</Typography> */}
        {post.map((posts) => (
          <Card style={{ marginBottom: "20px" }}>
            <Link
              to={`/my-profile/${posts?.user?._id}`}
              onClick={() => handleProfileRoute(posts?.user?._id)}
              style={{ textDecoration: "none", color: "black" }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    src={posts?.user?.profile_image_url}
                    alt={post?.username}
                  />
                }
                title={posts?.user?.user_name}
                style={{ cursor: "pointer" }}
              />
            </Link>

            <CardContent>
              <img
                src={posts?.image_url}
                alt="Post"
                style={{ width: "600px", maxHeight: "600px" }}
              />
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                color="primary"
                onClick={() => {
                  handleLikePostApi(posts._id);
                  setIsLiked(!isLiked);
                }}
              >
                {isLiked ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </IconButton>
              <Typography>{postLikes} Likes</Typography>

              <IconButton>
                <Button
                  onClick={() => {
                    handleValue({ id: posts._id });
                    handleModalOpen();
                  }}
                >
                  <ChatBubbleOutlineIcon />
                </Button>

                {/* <AddComment /> */}
              </IconButton>
              <Typography>{posts?.description}</Typography>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
};

export default BlogPage;
