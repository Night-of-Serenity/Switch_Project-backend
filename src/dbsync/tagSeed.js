const { Tag } = require("../models");

const userSeed = async () => {
  const TagData = [
    { tagName: "fasion", tagCount: 1 },
    { tagName: "food", tagCount: 2 },
    { tagName: "news", tagCount: 3 },
  ];

  let res = await Tag.bulkCreate(TagData);
  console.log(res);
  process.exit(0);
};
userSeed();
