const { Message } = require("../models");

const messageSeed = async () => {
    const messageData = [
        { textcontent: "sadfsadf", chatRoomId: 1, senderId: 1 },
        { textcontent: "2asdff", chatRoomId: 1, senderId: 2 },
        { textcontent: "asdfsadfadf", chatRoomId: 1, senderId: 2 },
        { textcontent: "23tdsgsadf", chatRoomId: 1, senderId: 1 },
        { textcontent: "dsgsadf", chatRoomId: 2, senderId: 1 },
        { textcontent: "sdfafsadf", chatRoomId: 2, senderId: 3 },
        { textcontent: "ahsdgdfsadf", chatRoomId: 2, senderId: 1 },
        { textcontent: "sadfsadf", chatRoomId: 3, senderId: 4 },
        { textcontent: "h2ewfsadf", chatRoomId: 3, senderId: 4 },
        { textcontent: "324ewfsadf", chatRoomId: 3, senderId: 1 },
    ];
    let res = await Message.bulkCreate(messageData);
};

module.exports = messageSeed;
