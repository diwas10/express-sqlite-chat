import express, {Application, NextFunction} from "express";
import {v4 as uuid} from "uuid";
import {Socket} from "socket.io";
import path from "path";
import {ChatData, UserData} from "./src/utils/interface";
import {decodeToken} from "./src/utils/token";

const app: Application = express();
const http = require("http").Server(app);

const io = require("socket.io")(http, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(express.static(path.join(__dirname, "static")))

export let users: Array<UserData> = [];
export const messages: ChatData[] = [];

app.set("view engine", "ejs")

export const Port = 3000;
app.use(express.urlencoded({extended: true}))

io.use((socket: Socket, next: NextFunction) => {
    const user = socket.handshake.auth?.token;

    if (!user) return next(new Error("Invalid User"));
    next();
});

io.sockets.on("connection", (socket: Socket) => {
    const token: string = socket.handshake.auth?.token;

    const user = decodeToken(token);

    // const index = users.findIndex(userFind => userFind.user === user)
    // if (index < 0) {
    //     users.push({user});
    //     socket.broadcast.emit("user", {user});
    // }

    const connectedSockets: Map<string, Socket> = io.sockets.sockets;
    console.log("************* Socket: User Connected ***************");

    socket.on("message", ({message, to}: Omit<ChatData, "id">) => {
        const msg = {message, id: uuid(), to, from: user.id};
        messages.push(msg);

        socket.emit("message", msg);

        const socketList = Array.from(connectedSockets.values());

        let toSocket = socketList.find((connectedOne: Socket) => connectedOne.handshake.auth?.token === to);

        if (toSocket) toSocket.emit("message", msg)
    });

    socket.on("disconnect", () => {
        console.log("Socket: User disconnected");
        socket.broadcast.emit("user", {user, offline: true});
    })

})


http.listen(Port, () => {
    console.log(`Server is Listening on port ${Port}`)
})
