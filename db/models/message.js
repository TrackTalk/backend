const { DataTypes } = require("sequelize");
const db = require("../db");
const User  = require("./user");
const Conversation = require("./conversation");

const Message = db.define("messages", {
    messageId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: { 
            model: User,
            key:  "userId"
        }
    },
    conversationId: {
        type: DataTypes.INTEGER,
        references: {
            model: Conversation,
            key: "conversationId"
        }
    }
});

module.exports = Message;