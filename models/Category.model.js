const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: String,
});

const Category = mongoose.model("medCategory", categorySchema);

module.exports = Category;
