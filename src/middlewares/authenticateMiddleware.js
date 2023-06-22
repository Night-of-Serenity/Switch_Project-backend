const createError = require("../utils/createError");
const createToken = require("../services/tokenService");
const userService = require("../services/userService");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError("unauthorized", 401);
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      createError("unauthorized", 401);
    }
    const payload = createToken.verify(token);
    const user = await userService.getUserByEmail(payload.id);
    if (!user) {
      createError("unauthorized", 401);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
