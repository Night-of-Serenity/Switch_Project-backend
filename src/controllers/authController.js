const { User } = require("../models");
const { verifyToken } = require("../validators/authValidator");
const {
  loginValidate,
  registerSchema,
} = require("../validators/authValidator");
const jwtDecode = require("jwt-decode");
const createError = require("../utils/createError");
const createToken = require("../services/tokenService");
const userService = require("../services/userService");
const bcryptService = require("../services/bcryptService");

exports.login = async (req, res, next) => {
  try {
    const value = loginValidate(req.body);
    const checkUser = await userService.getUserByEmail(value.email);
    if (!checkUser) {
      createError("Email wrong!!", 400);
    }
    const checkpassword = value.password;
    // // const checkpassword = await bcryptService.compare(
    // //   value.password,
    // //   checkUser.password
    // // );

    if (checkpassword !== "12345678") {
      createError("Email or Password wrong!!", 400);
    }

    const token = createToken.sign({ id: value.email });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.logingoogle = async (req, res, next) => {
  try {
    const { value } = req.body; //รับ token จากหน้าบ้าน
    const checkToken = await verifyToken(value); //เอาไปตรวจ token
    if (!checkToken) {
      createError("not have token!!", 400);
    }
    const userObj = jwtDecode(value); //เอา token ไปแปลงเป็น obj ด้วย jwtDecode
    const user = await User.findOne({
      where: {
        email: userObj.email,
      },
    });

    let newUser;
    if (!user) {
      newUser = await User.create({
        email: userObj.email,
        profileImageUrl: userObj.picture,
        googleAccName: userObj.name,
        googleAccSub: userObj.sub,
        password: "",
      });
    }
    //get token
    const token = user
      ? createToken.sign({ id: user.id })
      : createToken.sign({ id: newUser.id });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const value = registerSchema(req.body);
    const checkInputRegister = await userService.getUserByEmail(value.email);
    if (checkInputRegister) {
      createError("Email Already to Use", 400);
    }

    value.password = await bcryptService.sign(value.password);
    const userValue = await userService.createUser(value);
    const Token = createToken.sign({ id: userValue.email });
    res.status(200).json({ Token });
  } catch (err) {
    next(err);
  }
};
