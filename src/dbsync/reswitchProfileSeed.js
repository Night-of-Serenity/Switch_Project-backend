const { ReswitchProfile } = require("../models");
const userSeed = async () => {
    const reswitchProfileSeedData = [
        { postId: 1, userId: 1 },
        { postId: 2, userId: 2 },
        { postId: 3, userId: 3 },
        { postId: 4, userId: 4 },
        { postId: 5, userId: 5 },
        { postId: 6, userId: 6 },
        { postId: 7, userId: 7 },
        { postId: 8, userId: 8 },
        { postId: 9, userId: 9 },
        { postId: 10, userId: 10 },
        { replyId: 11, userId: 11 },
        { replyId: 12, userId: 12 },
        { replyId: 13, userId: 13 },
        { replyId: 14, userId: 14 },
        { replyId: 15, userId: 15 },
        { replyId: 16, userId: 16 },
        { replyId: 17, userId: 17 },
        { replyId: 18, userId: 18 },
        { replyId: 19, userId: 19 },
        { replyId: 20, userId: 20 },
    ];
    await ReswitchProfile.bulkCreate(reswitchProfileSeedData);
};

module.exports = userSeed;
