const mongoose = require("mongoose");

const shoppingCartSchema = mongoose.Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, ref: "pharmUser" },
  _products: [{ type: mongoose.Schema.Types.ObjectId, ref: "medicament" }],
  total: Number,
});

const ShoppingCart = mongoose.model("shoppingCart", shoppingCartSchema);

module.exports = ShoppingCart;
