const Joi = require("joi");
const validate = require("./validate");
const axios = require("axios");

const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: false }).required(),
    password: Joi.string().required(),
});

const registerSchema = Joi.object({
    username: Joi.string().trim().required(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email({ tlds: false }),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{8,30}$/)
        .trim()
        .required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .trim()
        .required()
        .strip(),
});

const editProflieSchema = Joi.object({
    username: Joi.string().trim(),
    bio: Joi.string().min(0).max(50),
    oldPassword: Joi.string()
        .pattern(/^[a-zA-Z0-9]{8,30}$/)
        .trim(),
    newPassword: Joi.string()
        .pattern(/^[a-zA-Z0-9]{8,30}$/)
        .trim(),
    confirmPassword: Joi.string().valid(Joi.ref("newPassword")).trim().strip(),
});

exports.loginValidate = validate(loginSchema);
exports.registerValidate = validate(registerSchema);
exports.editProflieValidate = validate(editProflieSchema);

exports.verifyToken = async (token) => {
    console.log("Verify Token...");
    let res = await axios.get(
        "https://oauth2.googleapis.com/tokeninfo?id_token=" + token,
        {
            validateStatus: function (status) {
                return status < 500;
            },
        }
    );
    return !!res.data.iss;
};
