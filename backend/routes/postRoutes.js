const express = require("express");
const {
  getPosts,
  createPost,
  likePost,
  commentOnPost,
} = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getPosts);
router.post("/", authMiddleware, createPost);
router.post("/:id/like", authMiddleware, likePost);
router.post("/:id/comment", authMiddleware, commentOnPost);

module.exports = router;
