const { DataTypes } = require("sequelize");
const db = require("../db");

const Like = db.define("like", {
    likeId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
});
module.exports =  Like;