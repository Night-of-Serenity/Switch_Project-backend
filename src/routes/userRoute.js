const express = require("express");
const userController = require("../controllers/userController");

const uploadMiddleware = require("../middlewares/uploadMiddleware");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

const router = express.Router();

router.patch(
    "/editprofile",
    uploadMiddleware.single("profileImageUrl"),
    authenticateMiddleware,
    userController.editprofile
);

router.get("/fetchMedia", authenticateMiddleware, userController.fetchMedia);

router.get(
    "/fetchuserprofile",
    authenticateMiddleware,
    userController.fetchPostsUserProfile
);

router.post(
    "/createreswitchreply/:reswitchProfileId",
    uploadMiddleware.single("imageUrl"),
    authenticateMiddleware,
    userController.reswitchProfileId
);
router.post(
    "/togglefollowing/:followingUserId",
    authenticateMiddleware,
    userController.toggleAddFollowing
);

router.get(
    "/fetchfollower",
    authenticateMiddleware,
    userController.fetchFollower
);

router.get(
    "/fetchfollowing",
    authenticateMiddleware,
    userController.fetchFollowing
);
router.get(
    "/getfollowingstatus/:otherUsesrId",
    authenticateMiddleware,
    userController.fetchFollowingStatus
);
router.get(
    "/fetchuserdetail",
    authenticateMiddleware,
    userController.fetchUserDetailById
);

router.get(
    "/fetchotheruserdetail/:otherUserId",
    userController.fetchOtherUserDetailById
);

router.get(
    "/fetchuserlikes",
    authenticateMiddleware,
    userController.fetchUserLike
);

module.exports = router;
