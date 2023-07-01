const { ChatRoom } = require("../models");

const chatRoomSeed = async () => {
    const chatRoomData = [
        { title: "uid1touid2" },
        { title: "uid1touid3" },
        { title: "uid1touid4" },
    ];
    let res = await ChatRoom.bulkCreate(chatRoomData);
};

module.exports = chatRoomSeed;
