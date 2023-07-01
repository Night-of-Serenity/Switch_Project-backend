const postSeed = require("../dbsync/postSeed");
const postToTagSeed = require("../dbsync/postToTagSeed");
const tagSeed = require("../dbsync/tagSeed");
const userSeed = require("../dbsync/userSeed");
const followSeed = require("../dbsync/followSeed");
const replySeed = require("../dbsync/replySeed");
const likeSeed = require("../dbsync/likeSeed");
const reswitchProfileSeed = require("../dbsync/reswitchProfileSeed");
const chatRoomSeed = require("./chatRoomSeed");
const chatMemberSeed = require("./chatMemberSeed");
const messageSeed = require("./messageSeed");
const allSeedSync = async () => {
    try {
        await userSeed();
        await postSeed();
        await tagSeed();
        await postToTagSeed();
        await replySeed();
        await likeSeed();
        await followSeed();
        await reswitchProfileSeed();
        await chatRoomSeed();
        await chatMemberSeed();
        await messageSeed();
    } catch (err) {
        console.log(err);
    }

    // console.log("object");
};

allSeedSync();
