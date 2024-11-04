const Post = require("../models/Post");

exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;

    const totalCount = await Post.countDocuments();

    const posts = await Post.find()
      .populate("user", "username")
      .skip(skip)
      .limit(limit);

    res.json({
      posts,
      totalCount,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

exports.createPost = async (req, res) => {
  const { content } = req.body;
  const post = new Post({ content, user: req.user.id });
  await post.save();
  res.status(201).json(post);
};

exports.likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  console.log({ r: req.user });
  if (!post.likes.includes(req.user.id)) {
    post.likes.push(req.user.id);
    await post.save();
  }
  res.json(post);
};

exports.commentOnPost = async (req, res) => {
  const { text } = req.body;
  const post = await Post.findById(req.params.id);
  post.comments.push({ user: req.user.id, text, userName: req.user });
  await post.save();
  res.json(post);
};
