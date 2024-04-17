const db = require("./db");
const {Comment, Conversation, Follow, Like, Message, Post, Track, User} = require("./db/models");
const conversationSeed = [{
    "user1Id": 16,
    "user2Id": 44
}];
const messageSeed = [{
    "text": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla.",
    "userId": 16,
    "conversationId": 8
}, {
    "text": "2 Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    "userId": 16,
    "conversationId": 8
} , {
    "text": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla.",
    "userId": 44,
    "conversationId": 8
}, {
    "text": "Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    "userId": 44,
    "conversationId": 8
}];

const seed = async () => {
    await db.sync();
    await Conversation.bulkCreate(conversationSeed);
    await Message.bulkCreate(messageSeed);
}

seed().then(() => process.exit());