const { User, ChatRoom, ChatMember, Message, sequelize } = require("../models");
const { Op } = require("sequelize");
// const { DIRECT_MESSAGE } = require("../config/constant");

const createError = require("../utils/createError");

exports.fetchAllChatRoomsOfUser = async (userId) => {
    try {
        // find roomId of user

        return allDirectMessageContact;
    } catch (err) {
        throw err;
    }
};
