const {
    User,
    Post,
    Follow,
    Like,
    Reply,
    ReswitchProfile,
    sequelize,
} = require("../models");
const { Op, literal, fn, col } = require("sequelize");
const { editProflieValidate } = require("../validators/authValidator");
const fs = require("fs");

const createError = require("../utils/createError");
const userService = require("../services/userService");
const postService = require("../services/postService");
const bcryptService = require("../services/bcryptService");
const uploadService = require("../services/uploadService");

exports.editprofile = async (req, res, next) => {
    try {
        let valueObj = {};
        const value = editProflieValidate(req.body);
        // const value = req.body;

        if (value.username) {
            checkUser = await userService.checkUsername(value.username);
            // checkUser คือเอาไปเช็คว่ามี user นี้อยู่ใน database
            if (checkUser) {
                createError("have user now!!", 400);
            }
            valueObj.username = value.username;
        }

        if (value.bio) {
            valueObj.bio = value.bio;
        }

        if (req.file) {
            // console.log("testFile");
            const result = await uploadService.upload(req.file.path);
            value.image = result.secure_url;
            valueObj.profileImageUrl = value.image;
        }

        if (value.oldPassword && value.newPassword) {
            const checkPassword = await bcryptService.compare(
                value.oldPassword,
                req.user.password
            );
            if (!checkPassword) {
                createError("Password wrong!!", 400);
            }
            value.newPassword = await bcryptService.hash(value.newPassword);
            valueObj.password = value.newPassword;
        }

        const user = { id: req.user.id };
        await userService.editUser(valueObj, user);
        const newEditProfile = await userService.getUserById(req.user.id);
        res.json(newEditProfile);
    } catch (err) {
        next(err);
    } finally {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
    }
};

exports.fetchMedia = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            where: {
                userId: req.user.id,
                imageUrl: {
                    [Op.ne]: null,
                },
            },
            include: [User, Like, ReswitchProfile, Reply],
            order: [["createdAt", "DESC"]],
        });

        const postsResult = postService.includingMorePropertiesForArrayOfPosts(
            posts,
            req.user.id
        );

        res.json(postsResult);
    } catch (err) {
        next(err);
    }
};

exports.fetchPostsUserProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;

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

exports.reswitchProfileId = async (req, res, next) => {
    try {
        const { reswitchProfileId } = req.params;
        const body = req.body;
        const valueObj = {
            reswitchProfileId: reswitchProfileId,
            userId: req.user.id,
        };

        if (req.file) {
            const result = await uploadService.upload(req.file.path);
            body.image = result.secure_url;
            valueObj.imageUrl = body.image;
        }

        if (body.textcontent) {
            valueObj.textcontent = body.textcontent;
        }

        await userService.createReswitchReply(valueObj);
        res.json({ message: "reply reswitch success" });
    } catch (err) {
        next(err);
    } finally {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
    }
};

exports.fetchFollower = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await userService.fetchFollowersByUserId(userId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.fetchFollowing = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await userService.fetchFollowingByUserId(userId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.toggleAddFollowing = async (req, res, next) => {
    try {
        const followingRelationship = await Follow.findOne({
            where: {
                followingUserId: req.params.followingUserId,
                followerUserId: req.user.id,
            },
        });

        if (followingRelationship) {
            await Follow.destroy({
                where: {
                    [Op.and]: [
                        { followingUserId: req.params.followingUserId },
                        { followerUserId: req.user.id },
                    ],
                },
            });
            res.json({ message: "request has been cancelled" });
        } else {
            await Follow.create({
                followingUserId: req.params.followingUserId,
                followerUserId: req.user.id,
            });
        }

        res.json({ message: "request has been sent" });
    } catch (err) {
        next(err);
    }
};

exports.fetchUserDetailById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const reswitchedPost = await userService.fetchUserReswitchedPost(
            userId
        );
        const reswitchedReply = await userService.fetchUserReswitchedReply(
            userId
        );

        const userPosts = await postService.fetchPostByIdForPostCount(userId);

        const postCount = userPosts ? userPosts.length : 0;

        const reswitchedCount = reswitchedPost.length + reswitchedReply.length;

        const followers = await userService.fetchFollowersByUserId(userId);
        const followings = await userService.fetchFollowingByUserId(userId);

        res.status(200).json({
            user: req.user,
            reswitchedCount,
            postCount,
            followers,
            followings,
        });
    } catch (err) {
        next(err);
    }
};

exports.fetchOtherUserDetailById = async (req, res, next) => {
    try {
        const { otherUserId: userId } = req.params;

        const user = await User.findByPk(userId);

        if (!user) createError("reference user is not exist", 404);

        const reswitchedPost = await userService.fetchUserReswitchedPost(
            userId
        );
        const reswitchedReply = await userService.fetchUserReswitchedReply(
            userId
        );

        const otherUserPosts =
            await postService.fetchOtherUserPostByIdForPostCount({
                otherUserId: userId,
            });

        const otherUserPostCount = otherUserPosts ? otherUserPosts.length : 0;
        const reswitchedCount = reswitchedPost.length + reswitchedReply.length;

        const followers = await userService.fetchFollowersByUserId(userId);
        const followings = await userService.fetchFollowingByUserId(userId);

        res.status(200).json({
            user: user,
            reswitchedCount,
            otherUserPostCount,
            followers,
            followings,
        });
    } catch (err) {
        next(err);
    }
};

exports.fetchFollowingStatus = async (req, res, next) => {
    try {
        const otherUserId = req.params.otherUsesrId;
        const currentUserId = req.user.id;
        const isFollowingStatus = await Follow.findOne({
            where: {
                followingUserId: otherUserId,
                followerUserId: currentUserId,
            },
        });
        const isFollowing = !!isFollowingStatus;

        const result = {
            userId: currentUserId,
            otherUserId: otherUserId,
            isFollowing: isFollowing,
        };

        return res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.fetchUserLike = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // find post likes
        const postlikes = await Like.findAll({
            where: {
                userId: userId,
                postId: { [Op.not]: null },
            },
        });
        const likedPostsId = postlikes.map((like) => like.postId);

        const likedPostsOfUser = await Post.findAll({
            where: { id: likedPostsId },
            include: [User, Like, ReswitchProfile, Reply],
        });

        // find reply likes
        const replylikes = await Like.findAll({
            where: { userId: userId, replyId: { [Op.not]: null } },
        });

        const likedRepliesId = replylikes.map((like) => like.replyId);

        const likedRepliesOfUser = await Reply.findAll({
            where: { id: likedRepliesId },
            include: [User, Like, ReswitchProfile],
        });

        const postsRes = postService.includingMorePropertiesForArrayOfPosts(
            likedPostsOfUser,
            userId
        );

        const repliesRes = postService.includingMorePropertiesForArrayOfReplies(
            likedRepliesOfUser,
            userId
        );

        const reslike = [...postsRes, ...repliesRes];
        const result = reslike.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

exports.fetchMediaOtherUser = async (req, res, next) => {
    try {
        const otherUsersId = +req.params.otherUsersId;
        //  if (!otherUsersId) {
        //      throw new Error("Invalid otherUsersId");
        //  }

        const post = await Post.findAll({
            where: {
                userId: otherUsersId,
                imageUrl: {
                    [Op.ne]: null,
                },
            },
            include: [User, Like, ReswitchProfile, Reply],
            order: [["createdAt", "DESC"]],
        });
        const postRes = postService.includingMorePropertiesForArrayOfPosts(
            post,
            otherUsersId
        );

        res.json(postRes);
    } catch (err) {
        next(err);
    }
};

exports.fetchOtherUserLike = async (req, res, next) => {
    try {
        const userId = +req.params.otherUserId;

        // find post likes
        const postlikes = await Like.findAll({
            where: {
                userId: userId,
                postId: { [Op.not]: null },
            },
        });
        const likedPostsId = postlikes.map((like) => like.postId);

        const likedPostsOfUser = await Post.findAll({
            where: { id: likedPostsId },
            include: [User, Like, ReswitchProfile, Reply],
        });

        // find reply likes
        const replylikes = await Like.findAll({
            where: { userId: userId, replyId: { [Op.not]: null } },
        });

        const likedRepliesId = replylikes.map((like) => like.replyId);

        const likedRepliesOfUser = await Reply.findAll({
            where: { id: likedRepliesId },
            include: [User, Like, ReswitchProfile],
        });

        const postsRes = postService.includingMorePropertiesForArrayOfPosts(
            likedPostsOfUser,
            userId
        );

        const repliesRes = postService.includingMorePropertiesForArrayOfReplies(
            likedRepliesOfUser,
            userId
        );

        const reslike = [...postsRes, ...repliesRes];
        const result = reslike.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
