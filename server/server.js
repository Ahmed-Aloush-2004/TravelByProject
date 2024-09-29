const db = require("./db");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const blogPostRouter = require("./routes/blogPostRoutes");
const userRouter = require("./routes/userRoutes");

dotenv.config({ path: path.resolve(__dirname, ".env") });

//  dotenv.config({ path: path.resolve(__dirname, "../.env") });

db();
console.log(process.env.PUBLIC_KEY);
const app = express();
app.use(cors());
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rowBody = buf.toString();
    },
    limit: "50mb",
  })
);

app.get("/api/config/emailjs", (req, res) =>
  res.send({
    template_id: process.env.TEMPLATE_ID,
    service_id: process.env.SERVICE_ID,
    public_key: process.env.PUBLIC_KEY,
  })
);
app.use("/api/users",userRouter)
app.use("/api/blog-posts", blogPostRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server runs on port ${port}`));
