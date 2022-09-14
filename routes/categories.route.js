const { Router } = require("express");
const router = Router();
const { categoryController } = require("../controllers/categories.controller");

router.post("/admin/category", categoryController.addCategory); //+
router.get("/admin/category", categoryController.getCategories); //+
router.patch("/admin/category/:id", categoryController.editCategory); //+
router.delete("/admin/category/:id", categoryController.deleteCategory); //+
router.get("/admin/category/:id", categoryController.getByCategory); //+

module.exports = router;
