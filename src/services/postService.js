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
                Like,
                ReswitchProfile,
            ],
            order: [["createdAt", "DESC"]],
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
                Like,
                ReswitchProfile,
                {
                    model: Reply,
                    include: [User, Like, ReswitchProfile],
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
                Like,
                Reply,
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
                Like,
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
                Reply,
                Like,
                ReswitchProfile,
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
            order: [["createdAt", "DESC"]],
        });
    } catch (err) {
        createError("error on fetch post by tagId", 404);
    }
};

exports.deleteReply = async (replyId, transaction) => {
    const t = transaction || (await sequelize.transaction());
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

        if (!transaction) await t.commit();
    } catch (err) {
        if (!transaction) await t.rollback();
        throw err;
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

const isLikedPost = async (postId, userId) => {
    const isLikedPost = await Like.findOne({
        where: {
            postId: postId,
            userId: userId,
        },
    });
    return !!isLikedPost;
};

exports.isLikedPost = isLikedPost;

const isLikedReply = async (replyId) => {
    const isLikedReply = await Like.findOne({
        where: {
            replyId: replyId,
        },
    });
    return !!isLikedReply;
};

exports.isLikedReply = isLikedReply;

const isReswitchedPost = async (postId, userId) => {
    const isReswitchedPost = await ReswitchProfile.findOne({
        where: {
            postId: postId,
            userId: userId,
        },
    });
    return !!isReswitchedPost;
};
exports.isReswitchedPost = isReswitchedPost;

const isReswitchedReply = async (replyId) => {
    const isReswitchedReply = await ReswitchProfile.findOne({
        where: {
            replyId: replyId,
        },
    });
    return !!isReswitchedReply;
};

exports.isReswitchedReply = isReswitchedReply;

const findLikeCountForPost = async (postId) => {
    const postLikes = await Like.findAll({
        where: {
            postId: postId,
        },
    });
    return postLikes.length;
};

exports.findLikeCountForPost = findLikeCountForPost;

const findLikeCountForReply = async (replyId) => {
    const replyLikes = await Like.findAll({
        where: {
            replyId: replyId,
        },
    });
    return replyLikes.length;
};

exports.findLikeCountForReply = findLikeCountForReply;

const findReswitchedCountForPost = async (postId) => {
    const postRewitched = await ReswitchProfile.findAll({
        where: {
            postId: postId,
        },
    });
    return postRewitched.length;
};

exports.findReswitchedCountForPost = findReswitchedCountForPost;

const findReswitchedCountForReply = async (replyId) => {
    const replyReswitched = await ReswitchProfile.findAll({
        where: {
            replyId: replyId,
        },
    });
    return replyReswitched.length;
};

exports.findReswitchedCountForReply = findReswitchedCountForReply;

const findReplyCountForPost = async (postId) => {
    const replies = await Reply.findAll({
        where: {
            postId: postId,
        },
    });
    return replies.length;
};

exports.findReplyCountForPost = findReplyCountForPost;

exports.includingMorePropertiesForArrayOfPosts = (postsArray, userId) => {
    const newPostsArray = JSON.parse(JSON.stringify(postsArray));
    const result = newPostsArray.map((post) => {
        let isLiked = false;
        for (let like of post.Likes) {
            if (like && like.userId === userId) isLiked = true;
        }

        let isReswitched = false;
        for (let reswitch of post.ReswitchProfiles) {
            if (reswitch && reswitch.userId === userId) isReswitched = true;
        }

        const replyCount = post.Replies?.length ? post.Replies.length : 0;
        const likedCount = post.Likes?.length ? post.Likes.length : 0;
        const reswitchedCount = post.ReswitchProfiles?.length
            ? post.ReswitchProfiles.length
            : 0;
        return {
            ...post,
            replyCount,
            likedCount,
            reswitchedCount,
            isLiked,
            isReswitched,
            isPost: true,
            isReply: false,
        };
    });
    return result;
};

exports.includingMorePropertiesForOnePost = (postObj, userId) => {
    let isLiked = false;
    if (postObj.Likes) {
        for (let like of postObj.Likes) {
            if (like && like.userId === userId) isLiked = true;
        }
    }

    let isReswitched = false;
    if (postObj.ReswitchProfiles) {
        for (let reswitch of postObj.ReswitchProfiles) {
            if (reswitch && reswitch.userId === userId) isReswitched = true;
        }
    }

    const replyCount = postObj.Replies?.length ? postObj.Replies.length : 0;
    const likedCount = postObj.Likes?.length ? postObj.Likes.length : 0;
    const reswitchedCount = postObj.ReswitchProfiles?.length
        ? postObj.ReswitchProfiles.length
        : 0;
    return {
        ...JSON.parse(JSON.stringify(postObj)),
        replyCount,
        likedCount,
        reswitchedCount,
        isLiked,
        isReswitched,
        isPost: true,
        isReply: false,
    };
};

exports.includingMorePropertiesForArrayOfReplies = (repliesArray, userId) => {
    const newRepliesArray = JSON.parse(JSON.stringify(repliesArray));
    const result = newRepliesArray.map((reply) => {
        let isLiked = false;
        for (let like of reply.Likes) {
            if (like && like.userId === userId) isLiked = true;
        }

        let isReswitched = false;
        for (let reswitch of reply.ReswitchProfiles) {
            if (reswitch && reswitch.userId === userId) isReswitched = true;
        }

        const likedCount = reply.Likes?.length ? reply.Likes.length : 0;
        const reswitchedCount = reply.ReswitchProfiles?.length
            ? reply.ReswitchProfiles.length
            : 0;
        return {
            ...reply,
            likedCount,
            reswitchedCount,
            isLiked,
            isReswitched,
            isPost: false,
            isReply: true,
        };
    });
    return result;
};

exports.includingMorePropertiesForOneReply = (replyObj, userId) => {
    console.log("test2");
    let isLiked = false;

    for (let like of replyObj.Likes) {
        if (like && like.userId === userId) isLiked = true;
    }

    let isReswitched = false;
    for (let reswitch of replyObj.ReswitchProfiles) {
        if (reswitch && reswitch.userId === userId) isReswitched = true;
    }

    const likedCount = replyObj.Likes.length;
    const reswitchedCount = replyObj.ReswitchProfiles.length;
    return {
        ...JSON.parse(JSON.stringify(replyObj)),
        likedCount,
        reswitchedCount,
        isLiked,
        isReswitched,
        isPost: false,
        isReply: true,
    };
};

exports.getAllPostsIdOfUser = async (userId) => {
    try {
        const posts = await Post.findAll({
            where: userId,
            order: [["createdAt", "DESC"]],
        });

        const postId = JSON.parse(JSON.stringify(posts.map))((post) => post.id);
        return postId;
    } catch (err) {
        throw err;
    }
};

exports.getAllReswitchedPostsOfUser = async (userId) => {
    try {
        const reswitchedPosts = await ReswitchProfile.findAll({
            where: { userId: userId, postId: { [Op.not]: null } },
            include: [
                { model: Post, include: [User, Like, ReswitchProfile, Reply] },
                { model: User },
            ],
            order: [["createdAt", "DESC"]],
        });
        const result = JSON.parse(JSON.stringify(reswitchedPosts));
        return result.map((reswitch) => ({
            ...reswitch,
            isReswitchedPost: true,
        }));
    } catch (err) {
        throw err;
    }
};

exports.getAllReswitchedRepliesOfUser = async (userId) => {
    try {
        const reswitchedReplies = await ReswitchProfile.findAll({
            where: { userId: userId, replyId: { [Op.not]: null } },
            include: [
                { model: Reply, include: [User, Like, ReswitchProfile] },
                { model: User },
            ],
            order: [["createdAt", "DESC"]],
        });
        const result = JSON.parse(JSON.stringify(reswitchedReplies));
        return result.map((reswitch) => ({
            ...reswitch,
            isReswitchedReply: true,
        }));
    } catch (err) {
        throw err;
    }
};

exports.includingMorePropertiesForArrayOfPostsForGuest = (postsArray) => {
    const newPostsArray = JSON.parse(JSON.stringify(postsArray));
    const result = newPostsArray.map((post) => {
        const replyCount = post.Replies?.length ? post.Replies.length : 0;
        const likedCount = post.Likes?.length ? post.Likes.length : 0;
        const reswitchedCount = post.ReswitchProfiles?.length
            ? post.ReswitchProfiles.length
            : 0;
        return {
            ...post,
            replyCount,
            likedCount,
            reswitchedCount,
            isPost: true,
            isReply: false,
        };
    });
    return result;
};
