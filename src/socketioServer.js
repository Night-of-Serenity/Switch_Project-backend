const { Server } = require("socket.io");
const http = require("http");
const userService = require("./services/userService");
const createError = require("./utils/createError");
const createToken = require("./services/tokenService");

const createIo = (app) => {
    const server = http.createServer(app);

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        },
    });

    const onlineUserInSocket = {};

    io.use(async (socket, next) => {
        const userId = socket.handshake.auth;
        const payload = createToken.verify(userId.accesstoken);
        const user = await userService.getUserById(payload.id);
        if (!user) {
            createError("unauthorized", 401);
        }
        const idUser = user.id;
        onlineUserInSocket[idUser] = socket.id;
        console.log(`online : ${Object.keys(onlineUserInSocket).length}`);
        console.log(onlineUserInSocket);
        next();
    });

    io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);
    });

    io.on("disconnect", () => {
        delete onlineUserInSocket[socket.userId];
        console.log("User Disconnected", socket.id);
    });

    return server;
};

module.exports = createIo;
