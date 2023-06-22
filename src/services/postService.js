const { Post, Tag, PostToTag } = require("../models");

const createError = require("../utils/createError");

exports.createPost = (input) => Post.create(input);

exports.createTags = async (tagArray) => {
    try {
        let newTags = [];
        for (let tag of tagArray) {
            const oldtag = await Tag.findOne({
                where: {
                    tagName: tag.tagName,
                },
            });

            if (oldtag) {
                oldtag.tagCount = oldtag.tagCount + 1;
                const res = await oldtag.save();
                console.log(res);
                newTags.push(res);
            } else {
                const res = await Tag.create(tag);
                console.log(res);
                newTags.push(res);
            }
        }
        return newTags;
    } catch (err) {
        createError("add tags error", 404);
    }
};

exports.createPostToTags = async (tags) => {
    // try {
    //     let newTags = [];
    //     for (let tag of tags) {
    //         const oldtag = await Tag.findOne({
    //             where: {
    //                 tagName: tag.tagName,
    //             },
    //         });

    //         if (oldtag) {
    //             oldtag.tagCount = oldtag.tagCount + 1;
    //             const res = await oldtag.save();
    //             newTags.push(res);
    //         } else {
    //             const res = await Tag.create(tag);
    //             newTags.push(res);
    //         }
    //     }
    //     return newTags;
    } catch (err) {
        createError("add postToTag error", 404);
    }
};
