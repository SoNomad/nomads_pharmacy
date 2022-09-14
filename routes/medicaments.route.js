const { Router } = require("express");
const { medController } = require("../controllers/medicaments.controller");
const router = Router();

router.post("/admin/medicament", medController.addProduct); //+
router.get("/medicament", medController.getProduct); //+
router.patch("/admin/medicament/:id", medController.editProduct); //+
router.delete("/admin/medicament/:id", medController.deleteProduct); //+

module.exports = router;
