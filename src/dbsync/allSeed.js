const postSeed = require("../dbsync/postSeed");
const postToTagSeed = require("../dbsync/postToTagSeed");
const tagSeed = require("../dbsync/tagSeed");
const userSeed = require("../dbsync/userSeed");
const replySeed = require("../dbsync/replySeed");
const likeSeed = require("../dbsync/likeSeed");
const allSeedSync = async () => {
    try {
        await userSeed();
        await postSeed();
        await tagSeed();
        await postToTagSeed();
        await replySeed();
        await likeSeed();
    } catch (err) {
        console.log(err);
    }

    console.log("object");
};

allSeedSync();
