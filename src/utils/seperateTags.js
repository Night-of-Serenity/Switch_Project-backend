function seperateTags(text) {
    const tags = [];
    const textList = text.split(" ");
    const tagslist = textList.filter((word) => word.startsWith("#"));

    for (let tagtext of tagslist) {
        const result = tagtext.split("#");
        for (let tag of result) {
            if (tag !== "") tags.push(tag);
        }
    }

    return tags;
}

module.exports = seperateTags;
