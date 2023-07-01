const { ChatMember } = require("../models");

const chatMemberSeed = async () => {
    const chatMemberData = [
        { chatRoomId: 1, userId: 1 },
        { chatRoomId: 1, userId: 2 },
        { chatRoomId: 2, userId: 3 },
        { chatRoomId: 2, userId: 1 },
        { chatRoomId: 3, userId: 1 },
        { chatRoomId: 3, userId: 4 },
    ];
    let res = await ChatMember.bulkCreate(chatMemberData);
};

module.exports = chatMemberSeed;
