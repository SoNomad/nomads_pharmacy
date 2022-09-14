const ShoppingCart = require("../models/ShoppingCart.model");
const Medicament = require("../models/Medicament.model");
const User = require("../models/User.model");

module.exports.shoppingCartController = {
  addShoppingCart: async (req, res) => {
    try {
      const { _userId, _products, total } = req.body;
      await ShoppingCart.create({
        _userId,
        _products,
        total,
      });
      res.json(`Корзина добавлена`);
    } catch (e) {
      res.json("Возникла ошибка при добавлении юзера. Код ошибки:" + e);
    }
  },
  deleteCart: async (req, res) => {
    try {
      await ShoppingCart.findByIdAndRemove(req.params.id);
      res.json("Корзина удалена");
    } catch (e) {
      res.json("Возникла ошибка при удалении корзины. Код ошибки:/n" + e);
    }
  },

  //--------------добавить в корзину
  addToCart: async (req, res) => {
    const preparate = await Medicament.findById(req.params.prepId);
    const user = await User.findById(req.params.userId);
    const userCart = await ShoppingCart.find({ _userId: req.params.userId });

    //проверка на наличие рецепта и ее необходимость у препарата
    if (!user.havePermission && preparate.needPermission) {
      return res.json("Нет рецепта для покупки лекартсва.");
    }
    //если препарат уже есть в корзине - убрать
    if (!user.shoppingCart.includes(req.params.prepId)) {
      await userCart.updateOne({
        $push: { _products: req.params.prepId },
        $inc: { total: preparate.price },
      });
      res.json(`${preparate.name} добавлен в корзину.`);
    } //если нет, то добавить
    else {
      await userCart.updateOne({
        $pull: { _products: req.params.prepId },
        $inc: { total: preparate.price * -1 },
      });
      return res.json(`${preparate} удален из корзины.`);
    }
  },

  //---------------------очистить корзину------------------
  resetCart: async (req, res) => {
    await ShoppingCart.findByIdAndUpdate(req.params._id, {
      _products: [],
      total: 0,
    });
    res.json("Корзина очищена.");
  },
};
