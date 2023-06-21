const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/login", authController.login);
router.post("/logingoogle", authController.logingoogle);
router.post("/register", authController.register);

module.exports = router;
