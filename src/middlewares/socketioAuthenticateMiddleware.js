const createToken = require("../services/tokenService");
const createError = require("../utils/createError");
const userService = require("../services/userService");

const socketioAuthenticate = async (accesstoken) => {
    // console.log(accessToken);
    const payload = createToken.verify(accesstoken);
    const user = await userService.getUserById(payload.id);
    if (!user) {
        createError("unauthorized", 401);
    }
    return user;
};

module.exports = socketioAuthenticate;
