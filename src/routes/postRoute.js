const express = require("express");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const postController = require("../controllers/postController");
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

module.exports = router;
