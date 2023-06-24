const express = require("express");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");
const feedController = require("../controllers/feedController");
const router = express.Router();

router.get(
    "/fetchfeeduser",
    authenticateMiddleware,
    feedController.fetchUserPostIncludeFollowing
);

router.get("/fetchtrend", feedController.fetchtrend);
// router.get("/fetchsuggestion", feedController.fetchUserSuggest);
// router.get("/search", feedController.search);

module.exports = router;
