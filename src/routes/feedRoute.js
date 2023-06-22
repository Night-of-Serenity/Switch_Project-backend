const express = require("express");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware")
const feedController = require("../controllers/feedController")
const router = express.Router();

router.get("/fetchpost", authenticateMiddleware, feedController.fetchUserPostIncludeFollowing)

module.exports = router;
