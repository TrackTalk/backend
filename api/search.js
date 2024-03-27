const router = require("express").Router();
const {Track, User, Post} = require("../db/models");
const {Op} = require("sequelize")

//root is localhost:8000/api/search

router.post("/users", async (req, res, next) => {
    try {
        let {query} = req.body;
        if (!query) return res.status(404).send("Please provide search query");

        query = query.toLowerCase();
        
        const filteredUsers = await User.findAll({
            where: {
                [Op.or]: [
                    {
                       userName: {
                        [Op.iLike]: `%${query}%`, 
                       }, 
                    },
                    {
                        firstName: {
                         [Op.iLike]: `%${query}%`, 
                        }, 
                    },
                    {
                        lastName: {
                         [Op.iLike]: `%${query}%`, 
                        }, 
                    },
                ]
            },
            include: {
                model: Post
            }
        });
        if(filteredUsers.length === 0) {
            throw new Error('No users found');
        } else {
            res.json(filteredUsers);
        };
    } catch (error) {
        next(error);
    }
});

router.post("/tracks", async (req, res, next) => {
    try {
        let {query} = req.body;
        if(!query) return res.status(404).send("Please provide search query");
        
        query = query.toLowerCase();

        const filteredTracks = await Track.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `%${query}%`,
                        },
                    },
                    {
                        artist: {
                            [Op.iLike]: `${query}%`
                        },
                    },
                ]
            },
            include: {
                model: Post,
            }
        });
        if(filteredTracks.length === 0) {
            throw new Error('No tracks found');
        } else {
            res.json(filteredTracks);
        };
    } catch (error) {
        next (error);
    }
});

router.post("/posts", async (req, res, next) => {
    try {
        let {query} = req.body;
        if(!query) return res.status(404).send("Please provide search query");

        query = query.toLowerCase();

        const filteredPosts = await Post.findAll({
            where: {
                bodyText: {
                    [Op.iLike]: `%\\m${query}\\M%`
                }
            }
        });

        if(filteredPosts.length === 0) {
            throw new Error('No Posts found');
        } else {
            res.json(filteredPosts);
        };
        
    } catch (error) {

    }
});



module.exports = router;



