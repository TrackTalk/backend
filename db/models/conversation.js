const { DataTypes } = require("sequelize");
const db = require("../db");

const Conversation = db.define("conversation", {
    conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
});

module.exports = Conversation;