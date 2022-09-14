const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");
const router = Router();

router.post("/admin/user", usersController.addUser); //+
router.delete("/admin/user/:id", usersController.deleteUser); //+
router.patch("/user/:id", usersController.editUser); //+
router.get("/admin/user", usersController.getUsers); //+
router.patch("/user/:id/cash", usersController.addCash); //+
router.get("/user/:userId/shoppingcart", usersController.showShoppingCart);
router.patch("/user/:userId/buy", usersController.buyProductsFromCart);

module.exports = router;
