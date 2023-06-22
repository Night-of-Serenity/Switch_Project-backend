const postSeed = require("../dbsync/postSeed")
const postToTagSeed = require("../dbsync/postToTagSeed")
const tagSeed = require("../dbsync/tagSeed")
const userSeed = require("../dbsync/userSeed")
const followSeed = require("../dbsync/followSeed")
const replySeed = require("../dbsync/replySeed");
const likeSeed = require("../dbsync/likeSeed");
const allSeedSync = async () => {
    try {
        await userSeed()
        await postSeed()
        await tagSeed()
        await postToTagSeed()
        await followSeed()
    } catch (err) {
        console.log(err);
    }

    console.log("object")
}

allSeedSync();
