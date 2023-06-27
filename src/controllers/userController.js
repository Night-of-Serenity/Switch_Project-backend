const { User, Post, Follow } = require("../models");
const { Op } = require("sequelize");
const { editProflieValidate } = require("../validators/authValidator");
const fs = require("fs");

const createError = require("../utils/createError");
const userService = require("../services/userService");
const postService = require("../services/postService");
const bcryptService = require("../services/bcryptService");
const uploadService = require("../services/uploadService");
const followSeed = require("../dbsync/followSeed");

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
                imgUrl: {
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
        const userValue = req.user.id;
        const result = await User.findAll({
            include: [
                {
                    model: Follow,
                    as: "Follower",
                    where: { followingUserId: userValue },
                },
            ],
        });

        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.fetchFollowing = async (req, res, next) => {
    try {
        const userValue = req.user.id;
        const result = await User.findAll({
            include: [
                {
                    model: Follow,
                    as: "Following",
                    where: { followerUserId: userValue },
                },
            ],
        });
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
