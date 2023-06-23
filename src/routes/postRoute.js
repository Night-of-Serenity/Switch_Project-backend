const express = require("express");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");
const upload = require('../middlewares/uploadMiddleware')
const postController = require('../controllers/postController')

const router = express.Router();

<<<<<<< HEAD
router.post("/createpost", () => {});
=======
router.post("/createpost", upload.single('postImage'),authenticateMiddleware,postController.createPost);
>>>>>>> develop

module.exports = router;
