const Medicaments = require("../models/Medicament.model");

module.exports.medController = {
  addProduct: async (req, res) => {
    const { name, category, needPermission, price } = req.body;
    try {
      const product = await Medicaments.create({
        name,
        category,
        needPermission,
        price,
      });
      res.json(product);
    } catch (e) {
      res.json(e);
    }
  },

  getProduct: async (req, res) => {
    try {
      const product = await Medicaments.find().populate("category", "name");
      res.json(product);
    } catch (e) {
      res.json(e);
    }
  },
  editProduct: async (req, res) => {
    try {
      await Product.findByIdAndUpdate(req.params.id, req.body);
      res.json("Изменения сохранены");
    } catch (e) {
      res.json("Возникла ошибка при редактировании товара. Код ошибки:/n" + e);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndRemove(req.params.id);
      res.json("книга удален");
    } catch (e) {
      res.json(
        "Возникла ошибка при удалении товара. Код ошибки:/n" + e.message
      );
    }
  },
};
