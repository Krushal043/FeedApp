import React, { useState } from "react";
import API from "../services/api";
import { Box, Typography, Button } from "@mui/material";
import CommentSection from "./CommentSection";

const Post = ({ post }) => {
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments);

  const handleLike = async () => {
    try {
      const res = await API.post(`/posts/${post._id}/like`);
      setLikeCount(res.data.likes.length);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = (comment) => {
    setComments([...comments, comment]);
  };

  return (
    <Box sx={{ border: "1px solid #ccc", p: 2, mb: 2 }}>
      <Typography variant="h6">{post.user.username}</Typography>
      <Typography>{post.content}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLike}
        sx={{ mt: 2 }}
      >
        Like ({likeCount})
      </Button>
      <CommentSection
        postId={post._id}
        comments={comments}
        onAddComment={handleAddComment}
      />
    </Box>
  );
};

export default Post;
