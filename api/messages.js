const router = require("express").Router();
const { Message, Conversation, User } = require("../db/models");
const { checkJWT } = require("../middleware/checkJWT");
const { Op } = require("sequelize");
const {getReceiverSocketId, io} = require('../socket/socket');
// console.log(getReceiverSocketId(16));
//root is localhost:8000/api/messages

router.post("/send/:userId", checkJWT, async (req, res, next) => {
    try {
        const user1Id = parseInt(req.userData.userId);
        const user2Id = parseInt(req.params.userId);
        const { text } = req.body;

        let conversation = await Conversation.findOne({
            where: {
                [Op.or]: [
                    { participants: [user1Id, user2Id] },
                    { participants: [user2Id, user1Id] }
                ]
            },
            include: Message
        });
        if (!conversation) {
            conversation = await Conversation.create({
                user1Id,
                user2Id
            });
        }
        const newMessage = await Message.create({
            userId: user1Id,
            text,
            conversationId: conversation.conversationId

        });
        
        const receiverSocketId = getReceiverSocketId(user2Id);
        if(receiverSocketId && newMessage){
            console.log("new message emitted to socket")
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }


        console.log(receiverSocketId, " this is receiver socket id")
        res.status(201).json(newMessage);

    } catch (error) {
        next(error);
    }
});

router.get("/get/:userId", checkJWT, async (req, res, next) => {
    try {
        const user2Id = parseInt(req.params.userId);
        const user1Id = parseInt(req.userData.userId);
        if (!user2Id) return res.status(400).send("User 2 id is required");
        if (!user1Id) return res.status(400).send("User token is invalid");
        const conversation = await Conversation.findOne({
            where: {
                [Op.or]: [
                    { participants: [user1Id, user2Id] },
                    { participants: [user2Id, user1Id] }
                ]
            },
            include: Message
        });
        if (!conversation) return res.status(404).send("No such conversation found");
        res.status(200).json(conversation.messages);

    } catch (error) {
        next(error);
    }
});

router.get("/all", checkJWT, async (req, res, next) => {
    try {
        const userId = parseInt(req.userData.userId);
        if (!userId) return res.status(403).send("Unauthorized User");
        const conversations = await Conversation.findAll({
            where: {
                [Op.or]: [
                    { user1Id: userId },
                    { user2Id: userId }
                ]
            },
            include: [
                {
                    model: Message,
                    as: 'messages'
                },
                {
                    model: User,
                    as: 'user1',
                    attributes: { exclude: [ "password" ]}
                },
                {
                    model: User,
                    as: 'user2',
                    attributes: { exclude: [ "password" ]}
                }
            ]
        });
        if (!conversations) return res.status(404).send("Conversations not Found");
        res.status(200).json(conversations);
    } catch (error) {
        next(error);
    }
});

router.get("/:user1Id/:user2Id", async (req, res) => {
    const user1Id = parseInt(req.params.user1Id);
    const user2Id = parseInt(req.params.user2Id);

    try {
        const conversation = await Conversation.findOne({
            where: {
                [Op.or]: [
                    { participants: [user1Id, user2Id] },
                    { participants: [user2Id, user1Id] }
                ]
            },
            include: Message
        });

        if (conversation) {
            res.json(conversation);
        } else {
            res.status(404).json({ message: "Conversation not found." });
        }
    } catch (error) {
        console.error("Error searching conversation:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;