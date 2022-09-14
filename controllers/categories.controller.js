const Category = require("../models/Category.model");
const Medicament = require("../models/Medicament.model");

module.exports.categoryController = {
  addCategory: async (req, res) => {
    try {
      const category = await Category.create({
        name: req.body.name,
      });
      res.json(category);
    } catch (e) {
      res.json(e);
    }
  },

  getCategories: async (req, res) => {
    try {
      const category = await Category.find({}, { name: 1 });
      res.json(category);
    } catch (e) {
      res.json(e);
    }
  },
  editCategory: async (req, res) => {
    try {
      await Category.findByIdAndUpdate(req.params.id, req.body);
      res.json("Изменения сохранены");
    } catch (e) {
      res.json(
        "Возникла ошибка при редактировании category. Код ошибки:/n" + e
      );
    }
  },

  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndRemove(req.params.id);
      res.json("Category удален");
    } catch (e) {
      res.json(
        "Возникла ошибка при удалении category. Код ошибки:/n" + e.message
      );
    }
  },
  getByCategory: async (req, res) => {
    try {
      const preps = await Medicament.find({ category: req.params.id });
      res.json(preps);
    } catch (e) {
      res.json(e.message);
    }
  },
};
