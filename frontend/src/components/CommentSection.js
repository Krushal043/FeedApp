import React, { useState } from "react";
import API from "../services/api";
import { Box, Typography, TextField, Button } from "@mui/material";

const CommentSection = ({ postId, comments, onAddComment }) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = async () => {
    try {
      const { data } = await API.post(`/posts/${postId}/comment`, {
        text: commentText,
      });
      onAddComment(data.comments[data.comments.length - 1]);
      setCommentText("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1">Comments</Typography>
      {comments.map((comment, index) => (
        <Box key={index} sx={{ mt: 1, p: 1, border: "1px solid #eee" }}>
          <Typography variant="body2">
            <strong>{comment.user.username}</strong>: {comment.text}
          </Typography>
        </Box>
      ))}
      <TextField
        label="Add a comment"
        fullWidth
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        sx={{ mt: 1 }}
      />
      <Button variant="contained" onClick={handleCommentSubmit} sx={{ mt: 1 }}>
        Comment
      </Button>
    </Box>
  );
};

export default CommentSection;
