const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: [process.env.FRONTEND_URL],
            methods: ["GET", "POST"]
        }
    });

    const userSocketMap = {};

    const getReceiverSocketId = (receiverId) => {
        console.log(userSocketMap)
        return userSocketMap[receiverId];
    };

    io.on("connection", (socket) => {
        console.log(`A socket connected: ${socket.id}`);

        const userId = socket.handshake.query.userId;
        if (userId != "undefined") userSocketMap[userId] = socket.id;

        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        socket.on("disconnect", () => {
            console.log(`socket disconnect: ${socket.id}`);
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        })
    })




// const setupSocket = (app) => {
//     const server = http.createServer(app);
//     const io = new Server(server, {
//         cors: {
//             origin: [process.env.FRONTEND_URL],
//             methods: ["GET", "POST"]
//         }
//     });

//     const userSocketMap = {};

//     const getReceiverSocketId = (receiverId) => {
//         console.log(userSocketMap)
//         return userSocketMap[receiverId];
//     };

//     io.on("connection", (socket) => {
//         console.log(`A socket connected: ${socket.id}`);

//         const userId = socket.handshake.query.userId;
//         if (userId != "undefined") userSocketMap[userId] = socket.id;

//         io.emit("getOnlineUsers", Object.keys(userSocketMap));

//         socket.on("disconnect", () => {
//             console.log(`socket disconnect: ${socket.id}`);
//             delete userSocketMap[userId];
//             io.emit("getOnlineUsers", Object.keys(userSocketMap));
//         })
//     })


//     return { server, io, getReceiverSocketId };
// }

module.exports = {app, server, io, getReceiverSocketId};