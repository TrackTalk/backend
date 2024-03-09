const { DataTypes } = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Message;