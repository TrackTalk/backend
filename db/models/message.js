const { DataTypes } = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
    messageId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Message;