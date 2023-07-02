const { User, DirectMessageChat, sequelize } = require("../models");
const { Op, where } = require("sequelize");

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

exports.fetchAllDirectMessagesBetweenUsers = async (userId, otherUserId) => {
    try {
        const allMessages = await DirectMessageChat.findAll({
            where: {
                [Op.or]: [
                    { senderId: userId, receiverId: otherUserId },
                    { senderId: otherUserId, receiverId: userId },
                ],
            },
            include: [
                { model: User, as: "Sender" },
                { model: User, as: "Receiver" },
            ],
            order: [["createdAt", "ASC"]],
        });
        return allMessages;
    } catch (err) {
        throw err;
    }
};

exports.findUserById = async (userId) => {
    const result = await User.findByPk(userId);
    return result;
};
