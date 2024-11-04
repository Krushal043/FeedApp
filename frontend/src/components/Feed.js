import React, { useEffect, useState } from "react";
import API from "../services/api";
import Post from "./Post";
import { Box, Typography, Button, CircularProgress } from "@mui/material";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const postsPerPage = 2;

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const { data } = await API.get(
        `/posts?page=${page}&limit=${postsPerPage}`
      );
      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      setHasMore(data.posts.length === postsPerPage);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (posts) {
      fetchPosts(page);
    }
  }, [page]);

  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Feed
      </Typography>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
      {loading && (
        <CircularProgress sx={{ display: "block", m: "20px auto" }} />
      )}
      {!loading && hasMore && (
        <Button onClick={loadMorePosts} variant="contained" sx={{ mt: 2 }}>
          Load More
        </Button>
      )}
    </Box>
  );
};

export default Feed;
