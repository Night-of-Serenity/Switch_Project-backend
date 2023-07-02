const { Message } = require("../models");

const messageSeed = async () => {
    const messageData = [
        { textcontent: "sadfsadf", chatRoomId: 1, senderId: 2 },
        { textcontent: "2asdff", chatRoomId: 1, senderId: 2 },
        { textcontent: "asdfsadfadf", chatRoomId: 1, senderId: 2 },
        { textcontent: "zxcsadf", chatRoomId: 1, senderId: 2 },
        { textcontent: "dsgsadf", chatRoomId: 1, senderId: 3 },
        { textcontent: "324ewfsadf", chatRoomId: 2, senderId: 1 },
        { textcontent: "32asdwfsadf", chatRoomId: 2, senderId: 1 },
        { textcontent: "sdfafsadf", chatRoomId: 1, senderId: 3 },
        { textcontent: "ahsdgdfsadf", chatRoomId: 1, senderId: 3 },
        { textcontent: "sadfsadf", chatRoomId: 1, senderId: 2 },
        { textcontent: "h2ewfsadf", chatRoomId: 1, senderId: 3 },
        { textcontent: "xcsdsadf", chatRoomId: 2, senderId: 1 },
        { textcontent: "32asdfsadf", chatRoomId: 2, senderId: 1 },
        { textcontent: "324ewfsadf", chatRoomId: 1, senderId: 3 },
        { textcontent: "gwegewfsadf", chatRoomId: 3, senderId: 1 },
        { textcontent: "sdf4ewfsadf", chatRoomId: 1, senderId: 2 },
        { textcontent: "shfegewfsadf", chatRoomId: 3, senderId: 1 },
        { textcontent: "xcnegewfsadf", chatRoomId: 3, senderId: 1 },
        { textcontent: "hfs4ewfsadf", chatRoomId: 1, senderId: 3 },
        { textcontent: "dfsadwfsadf", chatRoomId: 2, senderId: 1 },
        { textcontent: "bcvadfdfhs", chatRoomId: 2, senderId: 1 },
        { textcontent: "asd4ewfsadf", chatRoomId: 2, senderId: 1 },
        { textcontent: "sxdgewfsadf", chatRoomId: 3, senderId: 2 },
        { textcontent: "etegewfsadf", chatRoomId: 3, senderId: 2 },
        { textcontent: "ewrdwfsadf", chatRoomId: 2, senderId: 1 },
        { textcontent: "asdwfsadf", chatRoomId: 2, senderId: 1 },
        { textcontent: "nxwfsadf", chatRoomId: 3, senderId: 1 },
        { textcontent: "rnnewfsadf", chatRoomId: 3, senderId: 1 },
        { textcontent: "kugewfsadf", chatRoomId: 3, senderId: 1 },
    ];
    let res = await Message.bulkCreate(messageData);
};

module.exports = messageSeed;
