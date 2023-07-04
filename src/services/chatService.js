const { User, DirectMessageChat, sequelize } = require("../models");
const { Op } = require("sequelize");

exports.fetchAllDirectMessagesContacts = async (userId) => {
    try {
        const userDirectMessages = await DirectMessageChat.findAll({
            where: { [Op.or]: [{ senderId: userId }, { receiverId: userId }] },
        });

        const userDirectMessageId = userDirectMessages.map(
            (message) => message.id
        );

        const allContactReceivers = await User.findAll({
            where: { id: { [Op.not]: userId } },
            include: [
                {
                    model: DirectMessageChat,
                    as: "Receiver",
                    where: {
                        id: userDirectMessageId,
                    },
                },
            ],
            order: [
                ["username", "ASC"],
                ["Receiver", "createdAt", "ASC"],
            ],
        });
        const allContactSenders = await User.findAll({
            where: { id: { [Op.not]: userId } },
            include: [
                {
                    model: DirectMessageChat,
                    as: "Sender",
                    where: {
                        id: userDirectMessageId,
                    },
                },
            ],
            order: [
                ["username", "ASC"],
                ["Sender", "createdAt", "ASC"],
            ],
        });

        const allContacts = [
            ...JSON.parse(JSON.stringify(allContactReceivers)),
        ];
        for (let contact of allContactSenders) {
            const existContactIndex = allContacts.findIndex(
                (el) => el.id === contact.id
            );
            if (existContactIndex !== -1)
                allContacts[existContactIndex].Sender = contact.Sender;
            else {
                allContacts.push(JSON.parse(JSON.stringify(contact)));
            }
        }

        const getLastMessage = (contact) => {
            const SenderLastMessage =
                contact.Sender && contact.Sender.length > 0
                    ? contact.Sender[contact.Sender.length - 1]
                    : null;

            const ReceiverLastMessage =
                contact.Receiver && contact.Receiver.length > 0
                    ? contact.Receiver[contact.Receiver.length - 1]
                    : null;

            if (!SenderLastMessage) return ReceiverLastMessage;
            if (!ReceiverLastMessage) return SenderLastMessage;

            const lastMessage =
                new Date(SenderLastMessage.createdAt) >
                new Date(ReceiverLastMessage.createdAt)
                    ? SenderLastMessage
                    : ReceiverLastMessage;
            return lastMessage;
        };

        const result = JSON.parse(JSON.stringify(allContacts)).map(
            (contact) => {
                const lastMessage = getLastMessage(contact);
                return {
                    ...contact,
                    lastMessageText: lastMessage.textcontent,
                    lastMessageTime: new Date(
                        lastMessage.createdAt
                    ).toLocaleString(),
                };
            }
        );

        return result;
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
