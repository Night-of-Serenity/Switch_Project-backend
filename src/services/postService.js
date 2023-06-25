const {
    Post,
    Tag,
    PostToTag,
    Reply,
    ReswitchProfile,
    User,
    Like,
    sequelize,
} = require("../models");
const { Op } = require("sequelize");

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
        createError("error on fetch all user post", 404);
    }
};

exports.editReply = async (valueObj, replyId) => {
    try {
        return Reply.update(valueObj, {
            where: { id: replyId },
        });
    } catch (err) {
        createError("error on Edit Reply", 404);
    }
};

exports.createReswitch = async (input) => {
    try {
        return ReswitchProfile.create(input);
    } catch (err) {
        createError("error on create reswitch", 404);
    }
};

exports.deleteReswitch = async (reswitchId) => {
    try {
        return ReswitchProfile.destroy({
            where: {
                id: reswitchId,
            },
        });
    } catch (err) {
        createError("error on delete reswitch", 404);
    }
};

exports.fetchPostById = async (postId) => {
    try {
        return Post.findOne({
            where: {
                id: postId,
            },
            include: [
                User,
                {
                    model: Reply,
                    include: User,
                    order: [["updatedAt", "DESC"]],
                },
            ],
        });
    } catch (err) {
        createError("error on fetch post", 404);
    }
};

exports.fetchAllReswitchPostsByUserId = async (userId) => {
    try {
        return Post.findAll({
            include: [
                User,
                {
                    model: ReswitchProfile,
                    where: {
                        [Op.and]: [
                            { userId: userId },
                            {
                                postId: {
                                    [Op.not]: null,
                                },
                            },
                        ],
                    },
                },
            ],
        });
    } catch (err) {
        createError("error on fetch all user reswitch posts", 404);
    }
};

exports.fetchAllReswitchReplysByUserId = async (userId) => {
    try {
        return Reply.findAll({
            include: [
                User,
                {
                    model: ReswitchProfile,
                    where: {
                        [Op.and]: [
                            { userId: userId },
                            {
                                replyId: {
                                    [Op.not]: null,
                                },
                            },
                        ],
                    },
                },
            ],
        });
    } catch (err) {
        createError("error on fetch all reswitch replys", 404);
    }
};

exports.fetchPostsByTagId = async (tagId) => {
    try {
        return Post.findAll({
            include: [
                User,
                {
                    model: PostToTag,
                    include: [
                        {
                            model: Tag,
                            where: {
                                id: tagId,
                            },
                        },
                    ],
                },
            ],
            order: [["updatedAt", "DESC"]],
        });
    } catch (err) {
        createError("error on fetch post by tagId", 404);
    }
};

exports.deleteReply = async (replyId) => {
    const t = await sequelize.transaction();
    try {
        await Like.destroy({
            where: {
                replyId: replyId,
            },
            transaction: t,
        });

        await ReswitchProfile.destroy({
            where: {
                replyId: replyId,
            },
            transaction: t,
        });

        await Reply.destroy({
            where: {
                id: replyId,
            },
            transaction: t,
        });

        await t.commit();
    } catch (err) {
        await t.rollback();
        createError("error on delete reply, 404");
    }
};
