const express = require("express");
const chatController = require("../controllers/chatController");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

const router = express.Router();

router.get(
    "/fetchdirectmessagecontacts",
    authenticateMiddleware,
    chatController.fetchAllDirectMessagesContacts
);

router.get(
    "/fetchdirectmessags/:otherUserId",
    authenticateMiddleware,
    chatController.fetchAllDirectMessagesBetweenUsers
);

router.get(
    "/fetchuserdetial/:otherUserId",
    authenticateMiddleware,
    chatController.fetchUserDetial
);

module.exports = router;
