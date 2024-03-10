const { DataTypes } = require("sequelize");
const db = require("../db");

const Comment = db.define("comment", {
    commentId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
});

module.exports = Comment;