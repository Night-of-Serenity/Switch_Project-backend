const createToken = require("../services/tokenService");
const createError = require("../utils/createError");
const userService = require("../services/userService");

const socketioAuthenticate = async (accesstoken) => {
    // console.log(accessToken);
    const payload = createToken.verify(accesstoken);
    const user = await userService.getUserById(payload.id);
    if (!user) {
        console.log("unauthorized");
    }
    return user;
};

module.exports = socketioAuthenticate;
