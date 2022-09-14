const ShoppingCart = require("../models/ShoppingCart.model");

module.exports.userController = {
  addUser: async (req, res) => {
    try {
      const { name, havePermission, cash } = req.body;
      const user = await ShoppingCart.create({
        name,
        havePermission,
        cash,
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
      const user = await User.find();
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
