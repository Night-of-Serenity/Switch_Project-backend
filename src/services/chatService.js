const {
    User,
    ChatRoom,
    ChatMember,
    Message,
    DirectMessageChat,
    sequelize,
} = require("../models");
const { Op } = require("sequelize");

const createError = require("../utils/createError");

exports.fetchAllDirectMessagesContacts = async (userId) => {
    try {
        const directDirectMessageContactsOfUser = await User.findAll({
            include: [
                {
                    model: DirectMessageChat,
                    as: "Receiver",
                    where: {
                        senderId: userId,
                    },
                },
                {
                    model: DirectMessageChat,
                    as: "Sender",
                    where: {
                        receiverId: userId,
                    },
                },
            ],
            order: [["username", "ASC"]],
        });

        return directDirectMessageContactsOfUser;
    } catch (err) {
        throw err;
    }
};
