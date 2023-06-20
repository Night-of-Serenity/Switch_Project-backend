const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const axios = require("axios");
const { User } = require("../models");
// const AppError = require("../utils/appError");

exports.glogin = async (req, res, next) => {
  try {
    const credential = req.body;
    console.log(credential);
    res.status(200).json("done");
  } catch (err) {
    next(err);
  }
};
