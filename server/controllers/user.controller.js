const User = require("../models/user.model");
const JWT = require("jsonwebtoken");
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if ((!email, !name, !password)) {
    return res.status(400).json({ message: "Bad Request" });
  } else {
    try {
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already registered" });
      } else {
        const user = new User({ name, email, password });
        user.save(function (err, user) {
          if (err) {
            res
              .status(500)
              .json({ message: "Something went wrong", error: err.message });
          } else {
            return res.status(201).json({
              message: "Registration Successfull",
              user: { name: user.name, email: user.email },
            });
          }
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Bad Request" });
  } else {
    try {
      let user = await User.findOne({ email });
      if (user) {
        if (user.authenticate(password)) {
          const token = JWT.sign({ id: user._id }, process.env.SECRET);
          const { name, email, phone, image_url, bio } = user;
          return res.status(201).json({
            token,
            user: { name, email, phone, image_url, bio },
          });
        } else {
          return res.status(400).json({ message: "Invalid credentials" });
        }
      } else {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  }
};
exports.getProfile = async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(403).json({ message: "Please Login first" });
  } else {
    try {
      const { id } = user;
      const foundUser = await User.findById(id).select("-password -_id -__v");
      if (foundUser) {
        return res
          .status(200)
          .json({ message: "User Details", user: foundUser });
      } else {
        return res.status(403).json({ message: "Please Login first" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  }
};
exports.update = async (req, res) => {
  const { id } = req.user;
  if (!id) {
    return res.status(403).json({ message: "Please Login first" });
  } else {
    try {
      const body = req.body;
      await User.findByIdAndUpdate(id, body);
      const updatedUser = await User.findById(id).select("-password -_id -__v");
      return res
        .status(203)
        .json({ message: "Updated Successfully", user: updatedUser });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  }
};
