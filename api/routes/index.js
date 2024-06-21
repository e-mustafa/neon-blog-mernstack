const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const blogRouter = require("./blog.route");

router.use("/auth", authRouter);
router.use("/user", userRouter);

router.use("/blogs", blogRouter);

module.exports = router;
