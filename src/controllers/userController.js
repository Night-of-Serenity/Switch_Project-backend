const { User, Post } = require("../models");
const { Op } = require("sequelize");
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
        const allPosts = await postService.fetchAllPostsUserProfile(
            req.user.id
        );
        res.status(200).json(allPosts);
    } catch (err) {
        next(err);
    }
};
