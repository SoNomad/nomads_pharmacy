const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  havePermission: Boolean,
  cash: Number,
  shoppingCart: [{ type: mongoose.Schema.Types.ObjectId, ref: "shoppingCart" }],
});

const User = mongoose.model("pharmUser", userSchema);

module.exports = User;
