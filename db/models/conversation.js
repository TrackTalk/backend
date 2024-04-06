const { DataTypes } = require("sequelize");
const db = require("../db");
const User = require("./user");

const Conversation = db.define("conversations", {
    conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user1Id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "userId"
        }
    },
    user2Id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "userId"
        } 
    }, 
    participants: {
        type:DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
    }
});

Conversation.beforeCreate(async (conversations, options) => {
    console.log("it is here before create hook")
    const user1Id = conversations.getDataValue("user1Id");
    const user2Id = conversations.getDataValue("user2Id");
    conversations.setDataValue("participants", [user1Id, user2Id]);
})

Conversation.beforeBulkCreate(async (conversations, options) => {
    for(const conversation of conversations){
        const user1Id = conversation.getDataValue("user1Id");
        const user2Id = conversation.getDataValue("user2Id");
        conversation.setDataValue("participants", [user1Id, user2Id]);
    }
})

module.exports = Conversation;