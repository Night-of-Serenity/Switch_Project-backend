const express = require("express");
const authController = require("../controllers/authController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/login", authController.login);
router.post("/logingoogle", authController.logingoogle);
router.post("/register", authController.register);
router.get("/fetchme", authenticate, authController.fetchme);

module.exports = router;
