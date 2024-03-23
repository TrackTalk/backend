const router = require("express").Router();
const {User, Follow} = require("../db/models");

//root is localhost:8000/api/users

router.get("/", async (req, res, next) => {
    try {
        const usersInfo = await User.findAll({
            include: {all: true, nested: true}
        });
        if(usersInfo){
            res.status(200).json(usersInfo);
        } else {
            res.status(404).send(`Users data not found`);
        }

    } catch (error) {
        next(error);
    }
});

router.get("/:userId", async (req, res, next) => {
    try {
        const {userId} = req.params;
        if (!userId) return res.status(400).json({ error: "User ID must be provided" });

        const userInfo = await User.findByPk(userId, {
            include: {all: true, nested: true}
        });
        if(userInfo){
            res.status(200).json(userInfo);
        } else {
            res.status(404).send(`User not found with ${userId}`);
        }

    } catch (error) {
        next(error);
    }
});

router.put("/:userId/update", async (req, res, next) => {
    try{
        const {userId} = req.params;
        const updateData = req.body;
        if (!userId) return res.status(400).json({ error: "User ID must be provided" });

        const updatedData  = await User.update(updateData, {
            where: { id: userId },
            returning: true,
        });

        if(updatedData){
            res.status(200).json(updatedData[1][0]);
        }else{
            res.status(500).json("Failed to update user");
        }

    } catch (error) {
        next(error);
    }
})


router.get("/:userId/allFollowers", async (req, res, next) => {
    try{
        const {userId} = req.params;
        if (!userId) return res.status(400).json({ error: "User ID must be provided" });

        const followersInfo = await Follow.findAndCountAll({
            where:{
                followingId: userId
            },
            include: {
                model: User,
                as: 'followers'
            }
        });
        if(followersInfo){
            res.status(200).json(followersInfo);
        } else {
            res.status(404).send(`Followers information not found with ${userId}`);
        }

    } catch (error) {
        next(error);
    }
});

router.get("/:userId/isFollowed/:followerId", async (req, res, next) => {
    try{
        const {userId, followerId} = req.params;
        if (!userId || !followerId) return res.status(400).json({ error: "User ID and Follower ID must be provided" });

        const followersInfo = await Follow.findOne({
            where:{
                followingId: userId,
                followerId: followerId
            },
            include: {
                model: User,
                as: 'followers'
            }
        });
        if(followersInfo){
            res.status(200).json(followersInfo);
        } else {
            res.status(404).send(`Followers information not found with ${userId}`);
        }

    } catch (error) {
        next(error);
    }
});

router.post("/:userId/follow/:followingId", async (req, res, next) => {
    try {
        const {userId, followingId} = req.params;
        if (!userId || !followingId) return res.status(400).json({ error: "User ID and Following ID must be provided" });
        
        const followInfo = await Follow.create({
            where: {
              followingId: followingId,  
              followerId: userId 
            }
        });
        if(followInfo){
            res.status(200).json(followInfo);

        } else {
            res.status(404).send(`Following action is unsucessful with userIds : ${userId} and ${followingId}`);
        }
    } catch (error) {
        next(error);
    }
});

router.delete("/:userId/removeFollow/:followingId", async (req, res, next) => {
    try {
        const {userId, followingId} = req.params;
        if (!userId || !followingId) return res.status(400).json({ error: "User ID and Following ID must be provided" });
        
        const removeFollowInfo = await Follow.destroy({
            where: {
              followingId: followingId,  
              followerId: userId 
            }
        });
        if(removeFollowInfo){
            res.status(200).json(removeFollowInfo);
        } else {
            res.status(404).send(`Unfollowing action is unsucessful with userIds : ${userId} and ${followingId}`);
        }
    } catch (error) {
        next(error);
    }
})


module.exports = router;