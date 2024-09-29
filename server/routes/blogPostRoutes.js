const protectRoute = require("../middleware/authMiddlware");
const BlogPost = require("../models/BlogPost");
const express = require("express");
const  asyncHandler=require("express-async-handler")
const router = express.Router();

router.get("/post/:id", asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);
  if (blogPost) {
    return res.json(blogPost);
  } else {
    return res.status(404).json({ msg: "Blog post not found" });
  }
}));
router.get("/:category/:pageNumber",asyncHandler( async (req, res) => {
  const { category, pageNumber } = req.params;

  const posts = await BlogPost.find({});

  const increament = pageNumber + 4;

  let getStatus = () => (increament < posts.length ? 200 : 201);

  
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

}));
router.post("/", protectRoute,asyncHandler( async (req, res) => {
  const {
    image,
    title,
    contentOne,
    contentTwo,
    category,
    author = "Benjamin Fischer",
  } = req.body;

  const newBlogPost = await BlogPost.create({
    image,
    title,
    contentOne,
    contentTwo,
    category: String(category).toLowerCase(),
    author,
  });
  await newBlogPost.save();
  const blogPosts = await BlogPost.find({});
  console.log("post request blog",blogPosts);
  
  if (newBlogPost) {
    res.json(blogPosts);
  } else {
    res.status(404).send("Blog post could not be uploaded");
  }
}));
router.put("/", protectRoute, asyncHandler(async (req, res) => {
  const { _id, image, title, contentOne, contentTwo, category } = req.body;

  const blogPost = await BlogPost.findById(_id);

  if (blogPost) {
    blogPost.contentOne = contentOne;
    blogPost.contentTwo = contentTwo;
    blogPost.image = image;
    blogPost.title = title;
    blogPost.category = category;
    await blogPost.save();
    const blogPosts = await BlogPost.find({});

    res.json(blogPosts);
  } else {
    res.status(404).send("Blog post could not be updated");
  }
}));

router.delete("/:id", protectRoute,asyncHandler( async (req, res) => {
  const blogPost = await BlogPost.findByIdAndDelete(req.params.id);


  const allBlogPosts=await BlogPost.find({});

  if (allBlogPosts) {
    res.json(allBlogPosts);
  } else {
    res.status(404).send("Blog post could not be removed.");
  }
}));

module.exports = router;
