const { PostToTag } = require("../models");

const userSeed = async () => {
  const postToTagData = [
    { postId: 1, tagId: 1 },
    { postId: 2, tagId: 2 },
    { postId: 3, tagId: 3 },
  ];

  let res = await PostToTag.bulkCreate(postToTagData);
  // console.log(res);
  // process.exit(0);
};
// userSeed();

module.exports = userSeed;
