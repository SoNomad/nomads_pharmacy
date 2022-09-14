const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: String,
});

const Category = mongoose.model("prodCategory", categorySchema);

module.exports = Category;
