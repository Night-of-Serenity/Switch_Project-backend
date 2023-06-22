const { Follow } = require("../models")
exports.getFollowingAndFollowerByUserId = async (id) => {
    const follow = await Follow.findAll({
        where:{
          followerUserId : id
        }
        
    })

    console.log(JSON.parse(JSON.stringify(follow)))
    const followingUserId = follow.map((item) => item.folllowingUserId);


  return followingUserId;

};

