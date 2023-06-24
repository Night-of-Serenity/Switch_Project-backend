const { User, ReswitchReply } = require("../models");

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
