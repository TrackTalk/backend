const { DataTypes } = require("sequelize");
const db = require("../db");

const Follow = db.define("follow", {
    followId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
});

module.exports = Follow;
