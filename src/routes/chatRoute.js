const express = require("express");
const chatController = require("../controllers/chatController");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

const router = express.Router();

router.get(
    "/fetchchatroom",
    authenticateMiddleware,
    chatController.fetchAllDirectMessagesContacts
);

module.exports = router;
