const express = require("express");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

const router = express.Router();

router.post("/createpost", authenticateMiddleware);

module.exports = router;
