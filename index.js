require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require(`./db`);
const PORT = 8000;

const setupMiddleWare = (app) => {
    app.use(
        cors({
            credentials: true
        })
    );
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
};

const syncDB = () => db.sync().then(()=>{console.log("Resync DB")});

const setupRoutes = (app) => {
    //app.use("/api", require("./api"));
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