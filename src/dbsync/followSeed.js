const { Follow } = require("../models")

const followSeed = async () => {
    const TagData = [
        { folllowingUserId: 1, followerUserId: 1 },
        { folllowingUserId: 2, followerUserId: 2 },
        { folllowingUserId: 3, followerUserId: 3 },
        { folllowingUserId: 4, followerUserId: 4 },
        { folllowingUserId: 5, followerUserId: 5 },
        { folllowingUserId: 6, followerUserId: 6 },
        { folllowingUserId: 7, followerUserId: 7 },
        { folllowingUserId: 8, followerUserId: 8 },
        { folllowingUserId: 9, followerUserId: 9 },
        { folllowingUserId: 10, followerUserId: 10 },
        { folllowingUserId: 11, followerUserId: 11 },
        { folllowingUserId: 12, followerUserId: 12 },
        { folllowingUserId: 13, followerUserId: 13 },
        { folllowingUserId: 14, followerUserId: 14 },
        { folllowingUserId: 15, followerUserId: 15 },
        { folllowingUserId: 16, followerUserId: 16 },
        { folllowingUserId: 17, followerUserId: 17 },
        { folllowingUserId: 18, followerUserId: 18 },
        { folllowingUserId: 19, followerUserId: 19 },
        { folllowingUserId: 20, followerUserId: 20 },
        { folllowingUserId: 21, followerUserId: 21 },
        { folllowingUserId: 22, followerUserId: 22 },
        { folllowingUserId: 23, followerUserId: 23 },
        { folllowingUserId: 24, followerUserId: 24 },
        { folllowingUserId: 25, followerUserId: 25 },
        { folllowingUserId: 26, followerUserId: 26 },
        { folllowingUserId: 27, followerUserId: 27 },
        { folllowingUserId: 28, followerUserId: 28 },
        { folllowingUserId: 29, followerUserId: 29 },
        { folllowingUserId: 30, followerUserId: 30 },
        { folllowingUserId: 31, followerUserId: 31 },
        { folllowingUserId: 32, followerUserId: 32 },
        { folllowingUserId: 33, followerUserId: 33 },
        { folllowingUserId: 34, followerUserId: 34 },
        { folllowingUserId: 35, followerUserId: 35 },
        { folllowingUserId: 36, followerUserId: 36 },
        { folllowingUserId: 37, followerUserId: 37 },
        { folllowingUserId: 38, followerUserId: 38 },
        { folllowingUserId: 39, followerUserId: 39 },
        { folllowingUserId: 40, followerUserId: 40 },
        { folllowingUserId: 41, followerUserId: 41 },
        { folllowingUserId: 42, followerUserId: 42 },
        { folllowingUserId: 43, followerUserId: 43 },
        { folllowingUserId: 44, followerUserId: 44 },
        { folllowingUserId: 45, followerUserId: 45 },
        { folllowingUserId: 46, followerUserId: 46 },
        { folllowingUserId: 47, followerUserId: 47 },
        { folllowingUserId: 48, followerUserId: 48 },
        { folllowingUserId: 49, followerUserId: 49 },
        { folllowingUserId: 50, followerUserId: 50 },
    ]

    let res = await Tag.bulkCreate(TagData)
    // console.log(res);
    // process.exit(0);
}
// userSeed();

module.exports = followSeed
