const {
    Tag,
    Post,
    User,
    Reply,
    ReswitchProfile,
    ReswitchReply,
    Like,
} = require("../models");
const followService = require("../services/followService");
const { Op, where } = require("sequelize");

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

exports.fetchUserSuggest = async (req, res, next) => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: Follow,
                    as: "Follower",
                },
            ],
            order: [["Follower", "followerUserId", "DESC"]],
            limit: 5,
        });

        res.json(users);
    } catch (err) {
        next(err);
    }
};

exports.search = async (req, res, next) => {
    try {
        const inputSearch = req.query.searchinput;
        const search = await User.findAll({
            where: {
                username: { [Op.like]: "%" + inputSearch + "%" },
            },
        });

        res.json(search);
    } catch (err) {
        next(err);
    }
};

exports.fetchotheruser = async (req, res, next) => {
    try {
        const { otheruserId } = req.params;

        const post = await Post.findAll({
            where: { id: otheruserId },
            include: [User],
        });

        const reswitchPost = await Post.findAll({
            where: { id: otheruserId },
            include: [
                {
                    model: ReswitchProfile,
                    where: {
                        [Op.and]: [
                            { postId: { [Op.not]: null } },
                            { userId: otheruserId },
                        ],
                    },
                },
            ],
        });

        res.json(reswitchPost);
    } catch (err) {
        next(err);
    }
};
