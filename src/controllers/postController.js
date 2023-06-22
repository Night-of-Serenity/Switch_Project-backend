const fs = require("fs");
const uploadService = require("../services/uploadService");
const { Post } = require("../models");
const postService = require("../services/postService");

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
            console.log(req.body.textcontent);
            const text = req.body.textcontent;

            // ex. #food#sports hello world sfasdfa wfsdf #it #tech
            const tagstext = text.split(" ");
            const taglist = tagstext.filter((word) => word.startsWith("#"));

            for (let tagtext of taglist) {
                if (tagtext.split("#").length > 1) {
                    const result = tagtext.split("#");
                    for (let tag of result) {
                        if (tag !== "") tags.push({ tagName: tag });
                    }
                } else tags.push({ tagName: tagtext });
            }

            console.log(tags);

            value.textcontent = req.body.textcontent.trim();
        }

        if (req.file) {
            const result = await uploadService.upload(req.file.path);
            value.img_url = result.secure_url;
            console.log(value.img_url);
        }

        const newPost = await postService.createPost(value);
        const newTags = await postService.createTags(tags);
        const PostToTags = newTags.map((tag) => ({
            postId: newPost.id,
            tagId: tag.id,
        }));
        console.log(newPostToTags);

        const newPostToTags = await postService.createPostToTags(newPostToTags);

        console.log("new posttotags", newPostToTags);
        const post = await Post.findOne({
            where: { id: newPost.id },
            include: User,
        });

        res.status(201).json({ post });
    } catch (err) {
        next(err);
    } finally {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
    }
};
