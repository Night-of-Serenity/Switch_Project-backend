const { User, DirectMessageChat, sequelize } = require("../models");
const { Op } = require("sequelize");

exports.fetchAllDirectMessagesContacts = async (userId) => {
    try {
        const contactUsers = await DirectMessageChat.findAll({
            where: { [Op.or]: [{ senderId: userId }, { receiverId: userId }] },
        });

        const contactUsersId = contactUsers.map((contact) =>
            contact.senderId === userId ? contact.receiverId : contact.senderId
        );

        const allContactUsers = await User.findAll({
            where: { id: contactUsersId },
            include: [
                {
                    model: DirectMessageChat,
                    as: "Receiver",
                },
                {
                    model: DirectMessageChat,
                    as: "Sender",
                },
            ],
            order: [["username", "ASC"]],
        });

        return allContactUsers;
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

exports.findUser = async (userId) => {
    try {
        const user = await User.findByPk(userId, {
            include: [
                {
                    model: DirectMessageChat,
                    as: "Receiver",
                },
                {
                    model: DirectMessageChat,
                    as: "Sender",
                },
            ],
        });

        return user;
    } catch (err) {
        throw err;
    }
};
