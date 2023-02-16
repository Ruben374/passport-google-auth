const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  id: String,
  email: String,
  avatar: {
    type: String,
    default: "",
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
