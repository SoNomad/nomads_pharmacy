const ShoppingCart = require("../models/ShoppingCart.model");
const User = require("../models/User.model");

module.exports.usersController = {
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
      await ShoppingCart.findOneAndDelete({ _userId: req.params.id });
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

  //----------добавить денег---------------//
  addCash: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { cash: req.body.cash },
      });
      res.json(`Cash: +${req.body.cash}`);
    } catch (e) {
      res.json(e.message);
    }
  },

  //-----------просмотр корзины-----------//
  showShoppingCart: async (req, res) => {
    try {
      const userCart = await ShoppingCart.findOne(
        {
          _userId: req.params.userId,
        },
        { __v: 0 }
      ).populate("_userId", "name");
      res.json(userCart);
    } catch (e) {
      res.json(e.message);
    }
  },

  //---------покупка товаров и очистка корзины---//
  buyProductsFromCart: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const userCart = await ShoppingCart.findOne({
        _userId: req.params.userId,
      });

      if (user.cash < userCart.total) {
        return res.json(
          `Недостаточно средств. Не хватает еще ${
            userCart.total - user.cash
          } рублей.`
        );
      }

      await user.updateOne({ $inc: { cash: userCart.total * -1 } });
      await userCart.updateOne({ _products: [], total: 0 });
      res.json("Покупка совершена");
    } catch (e) {
      res.json(e.message);
    }
  },
};
