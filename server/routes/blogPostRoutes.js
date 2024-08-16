const BlogPost = require("../models/BlogPost");
const express = require("express");
const router = express.Router();

router.get("/:category/:pageNumber", async (req, res) => {
  const { category, pageNumber } = req.params;

  const posts = await BlogPost.find({});

  const increament = pageNumber + 4;

  let getStatus = () => (increament < posts.length ? 200 : 201);

  try {
    if (category == "all") {
      res.status(getStatus()).json(posts.slice(pageNumber, increament));
    } else if (category === "latest") {
      res
        .status(getStatus())
        .json(
          posts
            .sort(
              (objA, objB) => Number(objA.createdAt) - Number(objB.createdAt)
            )
            .slice(pageNumber, increament)
        );
    } else {
      const blogPosts = await BlogPost.find({ category });
      res.status(getStatus()).json(blogPosts.slice(pageNumber, increament));
    }
  } catch (error) {
    res.status(400).json({
      message:
        "Something Went wrong while getting the blogs.Please try again later.",
    });
  }
});

router.get("/:id", async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);
  if (!blogPost) return res.status(404).json({ msg: "Blog post not found" });
  res.json(blogPost);
});
module.exports = router;
