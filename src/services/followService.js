const { Follow } = require("../models");
exports.getFollowingAndFollowerByUserId = async (id) => {
    const follow = await Follow.findAll({
        where: {
            followerUserId: id,
        },
    });

    const followingUserId = follow.map((item) => item.followingUserId);

    return followingUserId;
};
