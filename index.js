require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require(`./db`);
// const { checkJWT } = require("./middleware/checkJWT");
const PORT = 8000;

const setupMiddleWare = (app) => {
    app.use(
        cors({
            origin: 'http://localhost:3000',
            credentials: true
        })
    );
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    // app.use(checkJWT);
};

const syncDB = () => db.sync().then(()=>{console.log("Resync DB")});

const setupRoutes = (app) => {
    app.use("/api", require("./api"));
    app.get("/", (req, res, next) => {
        res.send("Hit home");
    });
};

const configureApp = () => {
    const app = express();
    syncDB();
    setupMiddleWare(app);
    setupRoutes(app);
    console.log("here");

    app.listen(PORT, () => {
        console.log(`Live on port: ${PORT}`);
      });

    return app;
}

module.exports = configureApp();