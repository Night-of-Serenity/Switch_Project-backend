const { Post} = require("../models")
const followService = require("../services/followService");
const { Op } = require("sequelize");
exports.fetchUserPostIncludeFollowing= async (req, res, next) => {
    try {
        const userId = req.user.id
        const followingId = await followService.getFollowingAndFollowerByUserId(req.user.id)
       
        const posts = await Post.findAll({
            where: { [Op.or]: [{userId:followingId}, { userId:userId}],}
            
            
           
           
           
            
          });
      res.json(posts);
    } catch (err) {
      next(err);
    }
  };




