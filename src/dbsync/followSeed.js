const { Follow } = require("../models");

const followSeed = async () => {
    const followData = [
        { folllowingUserId: 2, followerUserId: 2 },
        { folllowingUserId: 3, followerUserId: 2 },
        { folllowingUserId: 2, followerUserId: 3 },
        { folllowingUserId: 2, followerUserId: 4 },
        { folllowingUserId: 2, followerUserId: 5 },
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
    ];

    let res = await Follow.bulkCreate(followData);
    // console.log(res);
    // process.exit(0);
};
// userSeed();

module.exports = followSeed;
