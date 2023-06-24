const express = require("express");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const postController = require("../controllers/postController");

const router = express.Router();

router.post(
    "/createpost",
    upload.single("postImage"),
    authenticateMiddleware,
    postController.createPost
);
router.post(
    "/createreply/:postId",
    upload.single("replyImage"),
    authenticateMiddleware,
    postController.createReply
);

router.patch(
    "/editreply/:replyId",
    upload.single("replyImage"),
    authenticateMiddleware,
    postController.editReply
);

router.post(
    "/postlike/:postId",
    authenticateMiddleware,
    postController.togglePostLike
);

router.post(
    "/replylike/:replyId",
    authenticateMiddleware,
    postController.toggleReplyLike
);

router.post(
    "/togglereswitchpost/:postId",
    authenticateMiddleware,
    postController.toggleReswitchPost
);

router.post(
    "/togglereswitchreply/:replyId",
    authenticateMiddleware,
    postController.toggleReswitchReply
);

router.get("/:postId", postController.fetchPostById);

router.delete(
    "/deletepost/:postId",
    authenticateMiddleware,
    postController.deleteUserPost
);

module.exports = router;
