const { User } = require("../models");

exports.getUserByEmail = (email) => {
  User.findOne({
    where: {
      email: email,
    },
  });
};

exports.createUser = (userValue) => User.create(userValue);
