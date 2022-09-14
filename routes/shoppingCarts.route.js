const { Router } = require("express");
const {
  shoppingCartController,
} = require("../controllers/shoppingCarts.controller");
const router = Router();

router.post("/user/shoppingCart", shoppingCartController.addShoppingCart);
router.delete("/user/shoppingCart/:id", shoppingCartController.deleteCart);
router.patch(
  "/user/:userId/preparate/:prepId",
  shoppingCartController.addToCart
);
router.patch("/user/shoppingCart/:_id", shoppingCartController.resetCart);

module.exports = router;
