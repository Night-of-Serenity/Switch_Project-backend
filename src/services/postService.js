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

exports.createPost = (input, transaction) =>
    Post.create(input, { transaction: transaction });

exports.createTag = async (tagName, transaction) => {
    try {
        console.log(tagName);
        const oldTag = await Tag.findOne({
            where: {
                tagName: tagName,
            },
            transaction: transaction,
        });

        console.log(oldTag?.toJSON());
        if (oldTag) {
            oldTag.tagCount += 1;
            return oldTag.save({ transaction: transaction });
        } else
            return Tag.create(
                { tagName: tagName },
                { transaction: transaction }
            );
    } catch (err) {
        throw err;
    }
};

exports.createPostToTag = async (postId, tagId, transaction) => {
    try {
        return PostToTag.create(
            { postId: postId, tagId: tagId },
            { transaction: transaction }
        );
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
                },
            ],
            order: [[Reply, "createdAt", "DESC"]],
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

exports.updatePost = async (input, postId, transaction) => {
    try {
        return Post.update(input, {
            where: {
                postId: postId,
            },
            transaction: transaction,
        });
    } catch (err) {
        createError("error on update post", 404);
    }
};

exports.decrementTags = async (tagsArray, transaction) => {
    try {
        // decrement all old tags
        const decrementTagsList = tagsArray.map(async (tag, index) => {
            const findTag = await Tag.findOne({
                where: {
                    tagName: tag,
                },
            });

            console.log(findTag.toJSON());
            if (!findTag) {
                createError("not found old tag", 404);
            }

            if (findTag.tagCount < 1) createError("invalid removed tag", 404);

            if (findTag.tagCount === 1)
                return Tag.destroy({
                    where: { id: findTag.id },
                    transaction: transaction,
                });

            // findTag.update({ tagCount: findTag.tagCount - 1 });
            // return findTag.save({ transaction: transaction });
            return Tag.update(
                { tagCount: findTag.tagCount - 1 },
                { where: { id: findTag.id }, transaction: transaction }
            );
        });
        const res = await Promise.all(decrementTagsList);

        return res;
    } catch (err) {
        createError(`error on decrement tags, ${err.message}`, 400);
    }
};

exports.deletePostToTags = async (postId, transaction) => {
    try {
        await PostToTag.destroy({
            where: { postId: postId },
            transaction: transaction,
        });
    } catch (err) {
        createError(`error on delete postToTag, ${err.message}`, 400);
    }
};

exports.deletePostById = async (postId, transaction) => {
    try {
        const res = await Post.destroy({
            where: {
                id: postId,
            },
            transaction: transaction,
        });
        if (res === 0) createError("error on delete post", 404);
    } catch (err) {
        throw err;
    }
};
