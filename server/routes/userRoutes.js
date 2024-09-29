const express = require("express");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const genToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "30d" });
};

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    console.log("body", req.body);

    const user = await User.findOne({ email });

    if (user && (await user.matchPasswords(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        token: genToken(user._id),
      });
    } else {
      res.status(401).send("Invalid email or password");
    }
  })
);

module.exports = router;
