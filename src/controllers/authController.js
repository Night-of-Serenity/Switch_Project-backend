const { User } = require("../models")
const { verifyToken } = require("../validators/authValidator")
const {
    loginValidate,
    registerValidate,
} = require("../validators/authValidator")
const jwtDecode = require("jwt-decode")
const createError = require("../utils/createError")
const createToken = require("../services/tokenService")
const userService = require("../services/userService")
const bcryptService = require("../services/bcryptService")

exports.login = async (req, res, next) => {
    try {
        const value = loginValidate(req.body)
        const checkUser = await userService.getUserByEmail(value.email)

        if (!checkUser) {
            createError("Email or Password wrong!!", 400)
        }

        const checkpassword = await bcryptService.compare(
            value.password,
            checkUser.password
        )

        if (!checkpassword) {
            createError("Email or Password wrong!!", 400)
        }

        const accessToken = createToken.sign({
            id: checkUser.id,
            email: checkUser.email,
        })
        res.status(200).json({ accessToken })
    } catch (err) {
        next(err)
    }
}

exports.logingoogle = async (req, res, next) => {
    try {
        const { token } = req.body //รับ token จากหน้าบ้าน

        const checkToken = await verifyToken(token) //เอาไปตรวจ token

        if (!checkToken) {
            createError("not have token!!", 400)
        }

        const userObj = jwtDecode(token) //เอา token ไปแปลงเป็น obj ด้วย jwtDecode
        const user = await User.findOne({
            where: {
                email: userObj.email,
            },
        })

        let newUser
        if (!user) {
            newUser = await User.create({
                email: userObj.email,
                isGoogleLogin: true,
                googleAccName: userObj.name,
                googleAccSub: userObj.sub,
                password: "",
            })
        }
        //get token
        const accessToken = user
            ? createToken.sign({ id: user.id, email: user.email })
            : createToken.sign({ id: newUser.id, email: newUser.email })

        res.status(200).json({ accessToken })
    } catch (err) {
        next(err)
    }
}

exports.register = async (req, res, next) => {
    try {
        const value = registerValidate(req.body)
        const checkInputRegister = await userService.getUserByEmail(value.email)
        if (checkInputRegister) {
            createError("Email Already to Use", 400)
        }

        value.password = await bcryptService.hash(value.password)
        const userValue = await userService.createUser(value)
        const accessToken = createToken.sign({
            id: userValue.id,
            email: userValue.email,
        })
        res.status(200).json({ accessToken })
    } catch (err) {
        next(err)
    }
}

exports.fetchme = async (req, res, next) => {
    console.log("....................", { user: req.user })
    res.status(200).json({ user: req.user })
}
