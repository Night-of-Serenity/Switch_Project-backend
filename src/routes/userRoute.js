const express = require("express");
const userController = require("../controllers/userController");

const uploadMiddleware = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.patch(
    "/editprofile",
    uploadMiddleware.single("profileImageUrl"),
    userController.editprofile
);

router.get("/fetchMedia", userController.fetchMedia);

router.get("/fetchuserprofile", userController.fetchPostsUserProfile);

router.post(
    "/createreswitchreply/:reswitchProfileId",
    uploadMiddleware.single("imageUrl"),
    userController.reswitchProfileId
);
router.post(
    "/togglefollowing/:followingUserId",

    userController.toggleAddFollowing
);

router.get("/fetchfollower", userController.fetchFollower);

router.get("/fetchfollowing", userController.fetchFollowing);
router.get(
    "/getfollowingstatus/:otherUsesrId",
    userController.fetchFollowingStatus
);
module.exports = router;
