const mongoose = require("mongoose");

const medicamentSchema = mongoose.Schema({
  name: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "medCategory",
  },
  needPermission: Boolean,
  price: Number,
});

const Medicament = mongoose.model("medicament", medicamentSchema);

module.exports = Medicament;
