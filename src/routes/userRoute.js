const express = require("express");
const userController = require("../controllers/userController");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.patch(
    "/editprofile",
    uploadMiddleware.single("profileImageUrl"),
    userController.editprofile
);

module.exports = router;
