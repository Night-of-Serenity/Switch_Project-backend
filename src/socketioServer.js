const { Server } = require("socket.io");
const http = require("http");
const userService = require("./services/userService");
const createError = require("./utils/createError");
const createToken = require("./services/tokenService");
const socketioAuthenticate = require("./middlewares/socketioAuthenticateMiddleware");

const createIo = (app) => {
    const server = http.createServer(app);

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        },
    });

    const onlineUserInSocket = {};
    const onlineUser = [];

    io.use(async (socket, next) => {
        const { accesstoken } = socket.handshake.auth;
        // console.log('---------token',accesstoken);
        if (accesstoken) {
            // console.log("............", accesstoken);
            const user = await socketioAuthenticate(accesstoken);
            const idUser = user.id;
            onlineUserInSocket[idUser] = socket.id;
            console.log(`online : ${Object.keys(onlineUserInSocket).length}`);
            console.log("User in System", onlineUserInSocket);
        }
        next();
    });

    io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);
        socket.on("sendMessage", (input) => {
            console.log("ค่าที่ส่งมา:", input);
            console.log(onlineUserInSocket[input?.receiver]);
            socket
                .to(onlineUserInSocket[input?.receiver])
                .emit("receiveMessage", input);
        });
    });

    io.on("disconnect", () => {
        delete onlineUserInSocket[socket.userId];
        console.log("User Disconnected", socket.id);
    });

    return server;
};

module.exports = createIo;
