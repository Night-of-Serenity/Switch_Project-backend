const express = require("express")
const authController = require("../controllers/authController")
const authenticateMiddleware = require("../middlewares/authenticateMiddleware")

const router = express.Router()

router.post("/login", authController.login)
router.post("/logingoogle", authController.logingoogle)
router.post("/register", authController.register)
router.get("/fetchme", authenticateMiddleware, authController.fetchme)

module.exports = router
