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
router.get(
    "/fetchsuggestion",
    authenticateMiddleware,
    feedController.fetchUserSuggest
);
router.get("/search", feedController.search);
router.get(
    "/fetchpostsbytag/:tagId",
    authenticateMiddleware,
    feedController.fetchPostsByTagId
);
router.get("/fetchotheruser/:otheruserId", feedController.fetchotheruser);
router.get("/fetchfeedguest", feedController.fetchFeedGuest);

module.exports = router;
