const router = require("express").Router();
const {Message, Conversation} = require("../db/models");
const {checkJWT} = require("../middleware/checkJWT");
const {Op}  = require("sequelize");

//root is localhost:8000/api/messages

router.post("/send/:user2Id", checkJWT, async (req, res, next) => {
    try {
        const user1Id = parseInt(req.userData.userId);
        const {user2Id} = parseInt(req.params);
        const {text} = req.body;

        let conversation = await Conversation.findOne({
            where: {
                [Op.or]: [
                    {participants: [user1Id, user2Id]},
                    {participants: [user2Id, user1Id]}
                ]
            },
            include: Message
        });

        if(!conversation){
            conversation = await Conversation.create({
                user1Id,
                user2Id
            });
        }
        const newMessage = await Message.create({
            userId: user1Id,
            text,
            conversationId: conversation.id

        });

        res.status(201).json(newMessage);
        
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
                    {participants: [user1Id, user2Id]},
                    {participants: [user2Id, user1Id]}
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