require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require(`./db`);
const { Server } = require('socket.io')
const http = require('http');
const setupSocket = require ("./socket/socket")
const {app, server} = require("./socket/socket")

// const { checkJWT } = require("./middleware/checkJWT");
const PORT = 8000;

const setupMiddleWare = (app) => {
    app.use(
        cors({
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        })
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    // app.use(checkJWT);
};

const syncDB = () => db.sync().then(() => { console.log("Resync DB") });

const setupRoutes = (app) => {
    app.use("/api", require("./api"));
    app.get("/", (req, res, next) => {
        res.send("Hit home");
    });
};


syncDB();
setupMiddleWare(app);
setupRoutes(app);

server.listen(PORT, () => {
        console.log(`Live on port: ${PORT}`);
});
// const configureApp = () => {
//     // const { app ,server, io, getReceiverSocketId} = setupSocket(app);
//     const {app, server} = require("./socket/socket")
//     syncDB();
//     setupMiddleWare(app);
//     setupRoutes(app);
//     console.log("here");

//     server.listen(PORT, () => {
//         console.log(`Live on port: ${PORT}`);
//     });

//     return {app, io, getReceiverSocketId};
// }

// module.exports = configureApp();