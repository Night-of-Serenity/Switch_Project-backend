const postSeed = require("../dbsync/postSeed");
const postToTagSeed = require("../dbsync/postToTagSeed");
const tagSeed = require("../dbsync/tagSeed");
const userSeed = require("../dbsync/userSeed");

const allSeedSync = async () => {
  try {
    await userSeed();
    await postSeed();
    await tagSeed();
    await postToTagSeed();
  } catch (err) {
    console.log(err);
  }

  console.log("object");
};

allSeedSync();
