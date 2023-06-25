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
router.get("/fetchsuggestion", feedController.fetchUserSuggest);
router.get("/search", feedController.search);
router.get("/fetchpostsbytag/:tagId", feedController.fetchPostsByTagId);
router.get("/fetchotheruser/:otheruserId", feedController.fetchotheruser);

module.exports = router;
