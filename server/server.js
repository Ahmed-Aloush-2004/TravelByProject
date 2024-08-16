const db = require("./db");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const blogPostRouter = require("./routes/blogPostRoutes");

//  dotenv.config({ path: path.resolve(__dirname, "../.env") });

db();

const app = express();
app.use(cors())
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rowBody = buf.toString();
    },
    limit: "50mb",
  })
);
app.use("/api/blog-posts", blogPostRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server runs on port ${port}`));
