const chatService = require("../services/chatService");

exports.joinRoom = async (roomId, userId) => {
    return;
};

exports.fetchAllDirectMessagesContacts = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const chatRooms = await chatService.fetchAllDirectMessagesContacts(
            userId
        );
        res.status(200).json(chatRooms);
    } catch (err) {
        next(err);
    }
};

exports.fetchAllDirectMessagesBetweenUsers = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { otherUserId } = req.params;
        const allMessages =
            await chatService.fetchAllDirectMessagesBetweenUsers(
                userId,
                otherUserId
            );
        res.status(200).json(allMessages);
    } catch (err) {
        next(err);
    }
};
