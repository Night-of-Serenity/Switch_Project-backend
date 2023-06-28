const { User, Post, Follow, Like, Reply } = require("../models");
const { Op } = require("sequelize");
const { editProflieValidate } = require("../validators/authValidator");

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
            console.log("testFile");
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
        const userValue = await userService.editUser(valueObj, user);
        res.json("new update user data");
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
        const post = await Post.findAll({
            where: {
                userId: req.user.id,
                imageUrl: {
                    [Op.ne]: null,
                },
            },

            include: User,
        });

        res.json(post);
    } catch (err) {
        next(err);
    }
};

exports.fetchPostsUserProfile = async (req, res, next) => {
    try {
        const allUserPosts = await postService.fetchAllPostsUserProfile(
            req.user.id
        );

        const allReswitchPosts =
            await postService.fetchAllReswitchPostsByUserId(req.user.id);

        const allReswitchReply =
            await postService.fetchAllReswitchReplysByUserId(req.user.id);

        const result = [
            ...allUserPosts,
            ...allReswitchPosts,
            ...allReswitchReply,
        ].sort(
            (postOrReplyA, postOrReplyB) =>
                postOrReplyB.updatedAt - postOrReplyA.updatedAt
        );

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

        const reswitchedCount = reswitchedPost.length + reswitchedReply.length;

        const followers = await userService.fetchFollowersByUserId(userId);
        const followings = await userService.fetchFollowingByUserId(userId);

        res.status(200).json({
            user: req.user,
            reswitchedCount,
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

        const reswitchedCount = reswitchedPost.length + reswitchedReply.length;

        const followers = await userService.fetchFollowersByUserId(userId);
        const followings = await userService.fetchFollowingByUserId(userId);

        res.status(200).json({
            user: user,
            reswitchedCount,
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
        const user = req.user.id;
        const likedPosts = await Post.findAll({
            include: [
                User,
                {
                    model: Like,
                    where: {
                        userId: user,
                    },
                },
            ],
        });

        const likedPostResult = likedPosts.filter(
            (post) => post.Likes.length > 0
        );

        const likedReply = await Reply.findAll({
            include: [
                User,
                {
                    model: Like,
                    where: {
                        userId: user,
                    },
                },
            ],
        });

        const likedReplyResult = likedReply.filter(
            (post) => post.Likes.length > 0
        );

        const reslike = [...likedPostResult, ...likedReplyResult];
        reslike.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        res.json({ reslike, likeCount });
    } catch (err) {
        next(err);
    }
};

exports.fetchMediaOtherUser = async (req, res, next) => {
    try {
        const { otherUsesrId } = req.params;
        const post = await Post.findAll({
            where: {
                userId: otherUsesrId,
                imageUrl: {
                    [Op.ne]: null,
                },
            },

            include: User,
        });
        res.json(post);
    } catch (err) {
        next(err);
    }
};

exports.fetchOtherUserLike = async (req, res, next) => {
    try {
        const { otherUsesrId } = req.params;
        const likedPosts = await Post.findAll({
            include: [
                User,
                {
                    model: Like,
                    where: {
                        userId: otherUsesrId,
                    },
                },
            ],
        });

        const likedPostResult = likedPosts.filter(
            (post) => post.Likes.length > 0
        );

        const likedReply = await Reply.findAll({
            include: [
                User,
                {
                    model: Like,
                    where: {
                        userId: otherUsesrId,
                    },
                },
            ],
        });

        const likedReplyResult = likedReply.filter(
            (post) => post.Likes.length > 0
        );

        const reslike = [...likedPostResult, ...likedReplyResult];
        reslike.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });
        res.json(reslike);
    } catch (err) {
        next(err);
    }
};
