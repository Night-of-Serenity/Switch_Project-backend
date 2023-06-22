const fs = require("fs");

const { Post } = require("../models");

exports.createPost = async (req, res, next) => {
  try {
    console.log(req.file);
    console.log(req.body);
  } catch (err) {}
};
