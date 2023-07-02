const { DirectMessageChat } = require("../models");

const directMessageSeed = async () => {
    const directMessageData = [
        { textcontent: "324ewfsadf", receiverId: 2, senderId: 1 },
        { textcontent: "32asdwfsadf", receiverId: 2, senderId: 1 },
        { textcontent: "sadfsadf", receiverId: 1, senderId: 2 },
        { textcontent: "2asdff", receiverId: 1, senderId: 2 },
        { textcontent: "asdfsadfadf", receiverId: 1, senderId: 2 },
        { textcontent: "zxcsadf", receiverId: 1, senderId: 2 },
        { textcontent: "shfegewfsadf", receiverId: 3, senderId: 1 },
        { textcontent: "xcnegewfsadf", receiverId: 3, senderId: 1 },
        { textcontent: "dsgsadf", receiverId: 1, senderId: 3 },
        { textcontent: "sdfafsadf", receiverId: 1, senderId: 3 },
        { textcontent: "ahsdgdfsadf", receiverId: 1, senderId: 3 },
        { textcontent: "sadfsadf", receiverId: 1, senderId: 2 },
        { textcontent: "h2ewfsadf", receiverId: 1, senderId: 3 },
        { textcontent: "xcsdsadf", receiverId: 2, senderId: 1 },
        { textcontent: "32asdfsadf", receiverId: 2, senderId: 1 },
        { textcontent: "324ewfsadf", receiverId: 1, senderId: 3 },
        { textcontent: "gwegewfsadf", receiverId: 3, senderId: 1 },
        { textcontent: "sdf4ewfsadf", receiverId: 1, senderId: 2 },
        { textcontent: "hfs4ewfsadf", receiverId: 1, senderId: 3 },
        { textcontent: "dfsadwfsadf", receiverId: 2, senderId: 1 },
        { textcontent: "bcvadfdfhs", receiverId: 2, senderId: 1 },
        { textcontent: "asd4ewfsadf", receiverId: 2, senderId: 1 },
        { textcontent: "sxdgewfsadf", receiverId: 3, senderId: 2 },
        { textcontent: "etegewfsadf", receiverId: 3, senderId: 2 },
        { textcontent: "ewrdwfsadf", receiverId: 2, senderId: 1 },
        { textcontent: "asdwfsadf", receiverId: 2, senderId: 1 },
        { textcontent: "nxwfsadf", receiverId: 3, senderId: 1 },
        { textcontent: "rnnewfsadf", receiverId: 3, senderId: 1 },
        { textcontent: "kugewfsadf", receiverId: 3, senderId: 1 },
    ];
    let res = await DirectMessageChat.bulkCreate(directMessageData);
};

module.exports = directMessageSeed;
