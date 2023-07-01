const { User, ChatRoom, ChatMember, Message, sequelize } = require("../models");
const { Op } = require("sequelize");

const createError = require("../utils/createError");

exports.fetchAllChatRoomsOfUser = async (userId) => {
    try {
        const chatRoomsUser = await ChatRoom.findAll({
            include: [{ model: ChatMember, where: { userId: userId } }],
        });

        const chatRoomsId = JSON.parse(JSON.stringify(chatRoomsUser)).map(
            (room) => room.id
        );

        const result = await ChatRoom.findAll({
            where: { id: chatRoomsId },
            include: [ChatMember, Message],
        });
        return result;
    } catch (err) {
        throw err;
    }
};
