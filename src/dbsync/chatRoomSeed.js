const { ChatRoom } = require("../models");

const chatRoomSeed = async () => {
    const chatRoomData = [
        { roomTitle: null },
        { roomTitle: null },
        { roomTitle: null },
    ];
    let res = await ChatRoom.bulkCreate(chatRoomData);
};

module.exports = chatRoomSeed;
