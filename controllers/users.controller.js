const User = require("../models/User.model");

module.exports.userController = {
  addUser: async (req, res) => {
    try {
      const { name, havePermission, cash, shoppingCart } = req.body;
      const user = await User.create({
        name,
        havePermission,
        cash,
        shoppingCart,
      });
      res.json(`Пользователь ${user.name} добавлен в коллекцию.`);
    } catch (e) {
      res.json("Возникла ошибка при добавлении юзера. Код ошибки:" + e);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndRemove(req.params.id);
      res.json("Юзер удален");
    } catch (e) {
      res.json("Возникла ошибка при удалении юзера. Код ошибки:/n" + e);
    }
  },
  getUsers: async (req, res) => {
    try {
      const user = await User.find().populate("shoppingCart", "_products");
      res.json(user);
    } catch (e) {
      res.json(e);
    }
  },
  editUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      res.json(user);
    } catch (e) {
      res.json(e.message);
    }
  },
};
