// routes/role.routes.js
const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role.controller");

router.post("/", roleController.creerRole);
router.get("/", roleController.listerRoles);

module.exports = router;

