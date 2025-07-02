const express = require("express");
const router = express.Router();
const {
  creerActivite,
  getAllActivites,
  updateActivite,
  deleteActivite,
  getActiviteById
} = require("../controllers/activity.controller");

const { verifyToken, isAdminOrChef } = require("../middlewares/authJwt");

router.post("/", verifyToken, isAdminOrChef, creerActivite);
router.get("/", verifyToken, isAdminOrChef, getAllActivites);
router.get("/:id", verifyToken, isAdminOrChef, getActiviteById); 
router.put("/:id", verifyToken, isAdminOrChef, updateActivite);
router.delete("/:id", verifyToken, isAdminOrChef, deleteActivite);

module.exports = router;
// verifyToken, isAdminOrChef,