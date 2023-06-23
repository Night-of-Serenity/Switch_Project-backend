const { Tag, Post, User } = require("../models");
const followService = require("../services/followService");
const { Op } = require("sequelize");

exports.fetchUserPostIncludeFollowing = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const followingId = await followService.getFollowingAndFollowerByUserId(
            req.user.id
        );

        const posts = await Post.findAll({
            where: {
                [Op.or]: [{ userId: followingId }, { userId: userId }],
            },
            include: User,
        });
        res.json(posts);
    } catch (err) {
        next(err);
    }
};

exports.fetchtrend = async (req, res, next) => {
    try {
        const post = await Tag.findAll({
            order: [["tagCount", "DESC"]],
            limit: 15,
        });
        res.json(post);
    } catch (err) {
        next(err);
    }
};
