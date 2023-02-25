const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  image_url: {
    type: String,
    default: "",
  },
});

// userSchema.virtual("password").set(function (password) {
//   this.hash_password = bcrypt.hashSync(password, 10);
// });

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = bcrypt.hashSync(user.password, 10);
    next();
  } else {
    next();
  }
});

userSchema.methods = {
  authenticate: function (entered_password) {
    return bcrypt.compareSync(entered_password, this.password);
  },
};

const User = mongoose.model("User", userSchema);
module.exports = User;
