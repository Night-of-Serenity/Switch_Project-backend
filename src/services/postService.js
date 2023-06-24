const { Post, Tag, PostToTag, Reply, User } = require("../models");

const createError = require("../utils/createError");

exports.createPost = (input) => Post.create(input);

exports.createTag = async (tagName) => {
    try {
        console.log(tagName);
        const oldTag = await Tag.findOne({
            where: {
                tagName: tagName,
            },
        });

        if (oldTag) {
            oldTag.tagCount += 1;
            return oldTag.save();
        } else return Tag.create({ tagName: tagName });
    } catch (err) {
        createError("error on create tag", 404);
    }
};

exports.createPostToTag = async (postId, tagId) => {
    try {
        return PostToTag.create({ postId: postId, tagId: tagId });
    } catch (err) {
        createError("error on create postToTag", 404);
    }
};

exports.createReply = async (input) => {
    try {
        return Reply.create(input);
    } catch (err) {
        createError("error on create reply", 404);
    }
};

exports.fetchAllPostsUserProfile = async (userId) => {
    try {
        return Post.findAll({
            where: {
                userId: userId,
            },
            include: [
                User,
                {
                    model: Reply,
                    include: User,
                },
            ],
        });
    } catch (err) {
        createError("error on fetch all user post");
    }
};
