const BlogPost = require("../models/BlogPost");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const blogPosts = await BlogPost.find({});
  res.json(blogPosts);
});

router.get("/:id", async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);
  if (!blogPost) return res.status(404).json({ msg: "Blog post not found" });
  res.json(blogPost);
});
module.exports = router;
