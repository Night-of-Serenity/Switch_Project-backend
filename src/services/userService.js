const { User } = require("../models")
const createError = require("../utils/createError")

exports.getUserByEmail = (email) =>
    User.findOne({
        where: {
            email: email,
        },
    })

exports.getUserById = (userId) =>
    User.findOne({
        where: {
            id: userId,
        },
    })

exports.createUser = (userValue) => User.create(userValue)
