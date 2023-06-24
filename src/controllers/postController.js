const fs = require("fs");
const uploadService = require("../services/uploadService");
const { Post, User, Reply, Tag, sequelize } = require("../models");
const postService = require("../services/postService");
const createError = require("../utils/createError");

exports.createPost = async (req, res, next) => {
    try {
        if (
            !req.file &&
            (!req.body.textcontent || !req.body.textcontent.trim())
        ) {
            createError("message or image is required", 400);
        }

        // value for create new post
        const value = {
            userId: req.user.id,
        };

        // value for tag
        const tags = [];

        if (req.body.textcontent && req.body.textcontent.trim()) {
            // console.log(req.body.textcontent);
            const text = req.body.textcontent;

            // ex. #food#sports hello world sfasdfa wfsdf #it #tech
            // seperate all tags from textcontent
            const tagstext = text.split(" ");
            const taglist = tagstext.filter((word) => word.startsWith("#"));

            for (let tagtext of taglist) {
                const result = tagtext.split("#");
                for (let tag of result) {
                    if (tag !== "") tags.push(tag);
                }
            }

            console.log("tags", tags);

            value.textcontent = req.body.textcontent.trim();
        }

        if (req.file) {
            const result = await uploadService.upload(req.file.path);
            value.imgUrl = result.secure_url;
            console.log(value.imgUrl);
        }

        const newPost = await postService.createPost(value);
        const tagRes = tags.map((tag) => postService.createTag(tag));
        const newTags = await Promise.all(tagRes);
        console.log("tags promise", newTags);
        const PostToTagsRes = newTags.map((tag) =>
            postService.createPostToTag(newPost.id, tag.id)
        );
        const newPostToTags = await Promise.all(PostToTagsRes);

        console.log("new posttotags", newPostToTags);
        const post = await Post.findOne({
            where: { id: newPost.id },
            include: User,
        });

        res.status(201).json(post);
    } catch (err) {
        next(err);
    } finally {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
    }
};

exports.createReply = async (req, res, next) => {
    try {
        const { postId } = req.params;
        console.log(postId);

        if (
            !req.file &&
            (!req.body.textcontent || !req.body.textcontent.trim())
        ) {
            createError("message or image is required", 400);
        }

        // check post exist
        const post = await Post.findByPk(postId);

        if (!post) {
            createError("post is not exist");
        }
        // value for create new replay
        const value = {
            userId: req.user.id,
            postId: postId,
        };

        if (req.body.textcontent && req.body.textcontent.trim()) {
            value.textcontent = req.body.textcontent.trim();
        }

        if (req.file) {
            const result = await uploadService.upload(req.file.path);
            value.imageUrl = result.secure_url;
            console.log(value.imageUrl);
        }

        await postService.createReply(value);

        // response
        const newpost = await Post.findAll({
            where: {
                id: post.id,
            },
            include: {
                model: Reply,
                include: User,
            },
        });

        res.status(201).json(newpost);
    } catch (err) {
        next(err);
    } finally {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
    }
};

exports.editPost = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { postId } = req.params;
        if (
            !req.file &&
            (!req.body.textcontent || !req.body.textcontent.trim())
        ) {
            createError("message or image is required", 400);
        }

        // value for create new post
        const value = {
            userId: req.user.id,
        };

        // value for tag
        const tags = [];

        if (req.body.textcontent && req.body.textcontent.trim()) {
            // console.log(req.body.textcontent);
            const text = req.body.textcontent;

            // ex. #food#sports hello world sfasdfa wfsdf #it #tech
            // seperate all tags from textcontent
            const tagstext = text.split(" ");
            const taglist = tagstext.filter((word) => word.startsWith("#"));

            for (let tagtext of taglist) {
                const result = tagtext.split("#");
                for (let tag of result) {
                    if (tag !== "") tags.push(tag);
                }
            }

            console.log("tags", tags);

            value.textcontent = req.body.textcontent.trim();
        }

        if (req.file) {
            const result = await uploadService.upload(req.file.path);
            value.imgUrl = result.secure_url;
            console.log(value.imgUrl);
        }

        console.log("all tags------>", tags);
        // reduce all old tags
        const reduceTagsRes = tags.map(async (tag, index) => {
            console.log(`index: ${index}--->tag: ${tag}`);
            const findTag = await Tag.findOne({
                where: {
                    tagName: tag,
                },
            });

            if (!findTag) {
                createError("not found old tag", 404);
            }

            return Tag.update(
                { tagCount: tagCount - 1 },
                { where: { tagName: tag }, transaction: t }
            );
        });

        await Promise.all(reduceTagsRes);

        // delete old PostToTags
        const deleteOldPostToTagsRes = tags.map(async (tag) => {
            const findPostToTags = await PostToTag.findOne({
                where: {
                    [Op.and]: [
                        {
                            postId: postId,
                        },
                        { tagName: tag },
                    ],
                },
            });

            if (!findPostToTags) {
                createError("not found postTotag", 404);
            }
            return PostToTag.destroy({
                where: {
                    [Op.and]: [{ postId: postId }, { tagName: tag }],
                },
                transaction: t,
            });
        });

        await Promise.all(deleteOldPostToTagsRes);

        // update post
        const newPost = await postService.updatePost(value, postId);

        // add new tags
        const tagRes = tags.map((tag) => postService.createTag(tag));
        const newTags = await Promise.all(tagRes);
        // console.log("tags promise", newTags);

        // add postToTag
        const PostToTagsRes = newTags.map((tag) =>
            postService.createPostToTag(newPost.id, tag.id)
        );
        const newPostToTags = await Promise.all(PostToTagsRes);

        console.log("new posttotags", newPostToTags);
        const post = await Post.findOne({
            where: { id: newPost.id },
            include: [{ model: User }, { model: Reply, include: User }],
        });

        await t.commit();
        res.status(201).json(post);
    } catch (err) {
        await t.rollback();
        next(err);
    } finally {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
    }
};
