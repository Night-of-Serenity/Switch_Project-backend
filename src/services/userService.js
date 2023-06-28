const {
    User,
    ReswitchReply,
    ReswitchProfile,
    Post,
    Reply,
    Follow,
} = require("../models");

const createError = require("../utils/createError");

exports.getUserByEmail = (email) =>
    User.findOne({
        where: {
            email: email,
        },
    });

exports.getUserById = (userId) =>
    User.findOne({
        where: {
            id: userId,
        },
    });

exports.createUser = (userValue) => User.create(userValue);

exports.checkUsername = (value) =>
    User.findOne({
        where: {
            username: value,
        },
    });

exports.editUser = (valueObj, user) =>
    User.update(valueObj, {
        where: { id: user.id },
    });

exports.createReswitchReply = (valueObj) => ReswitchReply.create(valueObj);

exports.fetchUserReswitchedPost = async (userId) => {
    const result = await Post.findAll({
        where: {
            userId: userId,
        },
        include: [ReswitchProfile],
    });

    return result.filter((post) => post.ReswitchProfiles.length);
};

exports.fetchUserReswitchedReply = async (userId) => {
    try {
        const result = await Reply.findAll({
            where: {
                userId: userId,
            },
            include: [ReswitchProfile],
        });

        return result.filter((reply) => reply.ReswitchProfiles.length);
    } catch (err) {
        throw err;
    }
};

exports.fetchFollowingByUserId = async (userId) => {
    try {
        return User.findAll({
            include: [
                {
                    model: Follow,
                    as: "Following",
                    where: { followerUserId: userId },
                },
            ],
        });
    } catch (err) {
        throw err;
    }
};

exports.fetchFollowersByUserId = async (userId) => {
    try {
        return User.findAll({
            include: [
                {
                    model: Follow,
                    as: "Follower",
                    where: { followingUserId: userId },
                },
                {
                    model: Follow,
                    as: "Following",
                    where: { followerUserId: userId },
                },
            ],
        });
    } catch (err) {
        throw err;
    }
};
