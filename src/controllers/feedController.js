const {
    Tag,
    Post,
    User,
    Like,
    Reply,
    ReswitchProfile,
    ReswitchReply,
    Follow,
} = require("../models");
const followService = require("../services/followService");
const postService = require("../services/postService");
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
            include: [User, Reply, Like, ReswitchProfile],
            order: [["createdAt", "DESC"]],
        });

        const result = postService.includingMorePropertiesForArrayOfPosts(
            posts,
            userId
        );
        res.status(200).json(result);
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
        const followings = await User.findAll({
            include: [
                {
                    model: Follow,
                    as: "Following",
                    where: {
                        followerUserId: req.user.id,
                    },
                },
            ],
        });

        const followingIds = followings.map((el) => el.id);

        console.log(followingIds);
        const toFollow = await User.findAll({
            where: {
                id: { [Op.notIn]: followingIds },
            },
            limit: 10,
        });

        res.json(toFollow);
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

exports.fetchPostsByTagId = async (req, res, next) => {
    try {
        const posts = await postService.fetchPostsByTagId(req.params.tagId);
        const result = posts.filter((post) => post.PostToTags.length);
        const resPost = postService.includingMorePropertiesForOnePost(result);
        res.status(200).json(resPost);
    } catch (err) {
        next(err);
    }
};

exports.fetchotheruser = async (req, res, next) => {
    try {
        const { otheruserId } = req.params;
        const postArray = [];

        const post = await Post.findAll({
            where: { id: otheruserId },
            include: [User],
        });
        postArray.push(...post);

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
        postArray.push(...reswitchPost);

        const reswitchReply = await Reply.findAll({
            where: { id: otheruserId },
            include: [
                User,
                {
                    model: ReswitchProfile,
                    where: {
                        [Op.and]: [
                            { replyId: { [Op.not]: null } },
                            { userId: otheruserId },
                        ],
                    },
                },
            ],
        });
        postArray.push(...reswitchReply);
        postArray.sort((a, b) => b.updatedAt - a.updatedAt);
        const result = postArray.map((item) => {
            if (item.isReswitchedPost && item.Post) {
                return postService.includingMorePropertiesForOnePost(
                    item.Post,
                    otheruserId
                );
            }
            if (item.isReswitchedReply) {
                return postService.includingMorePropertiesForOneReply(
                    item.Reply,
                    otheruserId
                );
            }

            return postService.includingMorePropertiesForOnePost(
                item,
                otheruserId
            );
        });

        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.fetchFeedGuest = async (req, res, next) => {
    try {
        const userAllPost = await Post.findAll({
            include: [
                User,
                ReswitchProfile,
                Reply,
                {
                    model: Like,
                    order: [["postId", "DESC"]],
                },
            ],
        });
        // const countedLikeInPost = [];
        // userAllPost.forEach(({ dataValues }) => {
        //     const likeCounted = dataValues.Likes.length;
        //     countedLikeInPost.push({ ...dataValues, likeCounted });
        // });

        ///เดี๋ยวมาอธิบาย

        // const top5Post = countedLikeInPost.sort(
        //     (a, b) => b.likeCounted - a.likeCounted
        // );

        const value =
            await postService.includingMorePropertiesForArrayOfPostsForGuest(
                userAllPost
            );

        res.json(value);
    } catch (err) {
        next(err);
    }
};

//
