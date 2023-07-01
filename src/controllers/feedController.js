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
        followingIds.push(req.user.id);
        console.log(followingIds);
        const toFollow = await User.findAll({
            where: {
                id: { [Op.notIn]: followingIds },
            },
            [Op.and]: [{ id: { [Op.notIn]: [req.user.id] } }],
        });

        toFollow.sort(() => Math.random() - 0.5);

        const top10 = toFollow.slice(0, 10);

        res.json(top10);
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
        const userId = req.user.id;
        console.log("------------userId", userId);
        const posts = await postService.fetchPostsByTagId(req.params.tagId);
        const result = posts.filter((post) => post.PostToTags.length);

        const newPosts = postService.includingMorePropertiesForArrayOfPosts(
            result,
            userId
        );
        res.status(200).json(newPosts);
    } catch (err) {
        next(err);
    }
};

exports.fetchotheruser = async (req, res, next) => {
    try {
        const userId = +req.params.otheruserId;

        const allUserPosts = await postService.fetchAllPostsUserProfile(userId);

        const allUserReswitchedPosts =
            await postService.getAllReswitchedPostsOfUser(userId);

        const allUserReswitchedReplies =
            await postService.getAllReswitchedRepliesOfUser(userId);

        // console.log({ allUserReswitchedPosts, allUserReswitchedReplies });

        const sortedResult = [
            ...JSON.parse(JSON.stringify(allUserReswitchedPosts)),
            ...JSON.parse(JSON.stringify(allUserReswitchedReplies)),
            ...JSON.parse(JSON.stringify(allUserPosts)),
        ].sort(
            (ReplyA, ReplyB) =>
                new Date(ReplyB.createdAt) - new Date(ReplyA.createdAt)
        );

        // console.log({ sortedResult });

        const newArray = JSON.parse(JSON.stringify(sortedResult));
        const result = newArray.map((item) => {
            console.log(`------>`, item);
            if (item.isReswitchedPost && item.Post) {
                return postService.includingMorePropertiesForOnePost(
                    item.Post,
                    userId
                );
            }

            if (item.isReswitchedReply) {
                return postService.includingMorePropertiesForOneReply(
                    item.Reply,
                    userId
                );
            }

            return postService.includingMorePropertiesForOnePost(item, userId);
        });
        res.status(200).json(result);
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
