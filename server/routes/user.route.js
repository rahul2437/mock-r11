const express = require("express");
const {
  getProfile,
  register,
  login,
  update,
} = require("../controllers/user.controller");
const { validate } = require("../middlewares/validateUser.middleware");

const userRouter = express.Router();

userRouter.get("/getprofile", validate, getProfile);
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.patch("/update", validate, update);

module.exports = userRouter;
