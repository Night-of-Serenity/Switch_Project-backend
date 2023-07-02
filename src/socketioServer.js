const { Server } = require("socket.io");
const http = require("http");
const userService = require("./services/userService");
const createError = require("./utils/createError");
const createToken = require("./services/tokenService");
const socketioAuthenticate = require("./middlewares/socketioAuthenticateMiddleware");
const chatService = require("./services/chatService");
const chatController = require("./controllers/chatController");

const createIo = (app) => {
    const server = http.createServer(app);

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        },
    });

    const onlineUser = [];

    io.use(async (socket, next) => {
        const { accesstoken } = socket.handshake.auth;
        // console.log('---------token',accesstoken);
        if (accesstoken) {
            // console.log("............", accesstoken);
            const user = await socketioAuthenticate(accesstoken);
            onlineUser.push({ userId: user.id, socketId: socket.id });
            console.log("---------onlineuser", onlineUser);
            socket.userId = user.id;
        }
        next();
    });

    io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);

        socket.on("sendMessage", async (input) => {
            console.log("ค่าที่ส่งมา:", input);

            const { receiverId, senderId, message } = input;
            const findDbSender = await chatService.findUserById(senderId);
            const findDbReceiver = await chatService.findUserById(receiverId);

            if ((findDbSender, findDbReceiver)) {
                await chatController.createDirectMessage(
                    message,
                    senderId,
                    receiverId
                );
                const findOnlineReceiver = onlineUser.find(
                    (user) => user.userId === receiverId
                );

                console.log("onlineReceiver----", findOnlineReceiver);
                if (findOnlineReceiver) {
                    // send to receiver
                    socket
                        .to(findOnlineReceiver.socketId)
                        .emit("receiveMessage", input);
                    // send back to sender
                    socket.emit("receiveMessage", input);
                }
            }
        });

        socket.on("disconnect", () => {
            console.log("disconnet run------");
            const onlineUserIndex = onlineUser.findIndex(
                (user) => user.socketId === socket.id
            );
            if (onlineUserIndex !== -1) {
                onlineUser.splice(onlineUserIndex, 1);
                console.log("User Disconnected", socket.id);
                console.log("onlineUser after disconnet", onlineUser);
            }
        });
    });

    return server;
};

module.exports = createIo;
