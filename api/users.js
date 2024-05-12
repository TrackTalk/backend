const router = require("express").Router();
const { User, Follow, Track } = require("../db/models");

//root is localhost:8000/api/users

router.get("/", async (req, res, next) => {
    try {
        const usersInfo = await User.findAll({
            include: { all: true, nested: true }
        });
        if (usersInfo) {
            res.status(200).json(usersInfo);
        } else {
            res.status(404).send(`Users data not found`);
        }

    } catch (error) {
        next(error);
    }
});

router.get("/username/:userName", async (req, res, next) => {
    try {
        const { userName } = req.params;
        if (!userName) return res.status(400).send('Missing username parameter');

        const userData = await User.findOne({
            where: {
                userName: userName
            }
        });
        if (userData) {
            res.status(200).json(userData);
        } else {
            res.status(404).send(`No user with the username of ${userName}`);
        }
    } catch (error) {
        next(error);
    }
})

router.get("/username/found/:userName/", async (req, res, next) => {
    try {
        const { userName } = req.params;
        if (!userName) return res.status(400).send('Missing username parameter');

        const userData = await User.findOne({
            where: {
                userName: userName
            }
        });
        if (userData) {
            res.status(200).json({ found: true });
        } else {
            res.status(200).json({ found: false });
        }
    } catch (error) {
        next(error);
    }
})

router.get("/email/found/:email/", async (req, res, next) => {
    try {
        const { email } = req.params;
        if (!email) return res.status(400).send('Missing email parameter');

        const userData = await User.findOne({
            where: {
                email: email
            }
        });
        if (userData) {
            res.status(200).json({ found: true });
        } else {
            res.status(200).json({ found: false });
        }
    } catch (error) {
        next(error);
    }
})

router.get("/:userId", async (req, res, next) => {
    try {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ error: "User ID must be provided" });

        const userInfo = await User.findByPk(userId, {
            attributes: {
                exclude: ["password", "accessToken", "refreshToken"]
            },
            include: [{ 
                model: Track,
                 
            }]
            // include: [{
            //     model: Follow,
            //     as: 'followers',
            //     include: {
            //         model: User,
            //         as: 'followers',
            //         attributes: { exclude: ["password", "accessToken", "refreshToken"] }
            //     }
            // }]
        });
        if (userInfo) {
            res.status(200).json(userInfo);
        } else {
            res.status(404).send(`User not found with ${userId}`);
        }

    } catch (error) {
        next(error);
    }
});

router.get("/count", async (req, res, next) => {
    try {
        const totalCount = await User.count();
        if(totalCount) {
            res.status(200).json(totalCount);
        } else {
            res.status(404).send("User data not found");
        }
    } catch (error) {
        next(error);
    }
})

router.put("/:userId/update", async (req, res, next) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;
        if (!userId) return res.status(400).json({ error: "User ID must be provided" });

        const updatedData = await User.update(updateData, {
            where: { userId: userId },
            returning: true,
        });

        if (updatedData) {
            res.status(200).json(updatedData);
        } else {
            res.status(500).json("Failed to update user");
        }

    } catch (error) {
        next(error);
    }
})


router.get("/:userId/allFollowers", async (req, res, next) => {
    try {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ error: "User ID must be provided" });

        const followersInfo = await Follow.findAndCountAll({
            where: {
                followingId: userId
            },
            include: {
                model: User,
                as: 'followers',
                attributes: { exclude: ["password", "accessToken", "refreshToken"] }
            }
        });
        if (followersInfo) {
            res.status(200).json(followersInfo);
        } else {
            res.status(404).send(`Followers information not found with ${userId}`);
        }

    } catch (error) {
        next(error);
    }
});

router.get("/:userId/isFollowed/:followerId", async (req, res, next) => {
    try {
        const { userId, followerId } = req.params;
        if (!userId || !followerId) return res.status(400).json({ error: "User ID and Follower ID must be provided" });

        const followersInfo = await Follow.findOne({
            where: {
                followingId: userId,
                followerId: followerId
            },
            include: {
                model: User,
                as: 'followers'
            }
        });
        if (followersInfo) {
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
        const { userId, followingId } = req.params;
        if (!userId || !followingId) return res.status(400).json({ error: "User ID and Following ID must be provided" });

        const followData = {
            followingId: followingId,
            followerId: userId,
        }
        
        const followInfo = await Follow.create(followData, {
            returning: true
        });
        if (followInfo) {
            res.status(200).json(followInfo);

        } else {
            res.status(404).send(`Following action is unsucessful with userIds : ${userId} and ${followingId}`);
        }
    } catch (error) {
        next(error);
    }
});

router.delete("/:userId/unfollow/:followingId", async (req, res, next) => {
    try {
        const { userId, followingId } = req.params;
        if (!userId || !followingId) return res.status(400).json({ error: "User ID and Following ID must be provided" });

        const removeFollowInfo = await Follow.destroy({
            where: {
                followingId: followingId,
                followerId: userId
            }
        });
        if (removeFollowInfo) {
            res.status(200).json(removeFollowInfo);
        } else {
            res.status(404).send(`Unfollowing action is unsucessful with userIds : ${userId} and ${followingId}`);
        }
    } catch (error) {
        next(error);
    }
})


module.exports = router;