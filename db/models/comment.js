const { DataTypes } = require("sequelize");
const db = require("../db");

const Comment = db.define("comment", {
    text: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
});

module.exports = Comment;