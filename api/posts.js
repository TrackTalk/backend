const router = require("express").Router();
const { all } = require("axios");
const { Post, User, Like, Comment, Track } = require("../db/models");

//root is localhost:8000/api/posts

router.get("/", async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: Comment,
                    as: 'comments',
                    include: [{
                        model: User,
                        as: 'user',
                        attributes: ['userName']
                    }]
                },
                {
                    model: User,
                    as: 'user',
                    attributes: { exclude: ["password", "accessToken", "refreshToken"] }
                },
                {
                    model: Track,
                    as: 'track',
                },

            ],
            order: [['createdAt', 'DESC']]
        });
        if (posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).send("No posts found.");
        }
    } catch (error) {
        next(error);
    }
});

router.get("/count", async (req, res, next) => {
    try{
        const postCount = await Post.count();
        if(postCount) {
            res.status(200).json(postCount);
        } else {
            res.status(404).send("No post data found");
        }
    } catch (error) {
        next(error)
    }
})

router.get("/:postId", async (req, res, next) => {
    try {
        const { postId } = req.params;
        console.log("here" + postId);
        if (!postId) return res.status(400).json({ error: "Post ID must be provided" });

        const postInfo = await Post.findByPk(postId, {
            include: [
                {
                    model: Comment,
                    as: 'comments',
                    include: [{
                        model: User,
                        as: 'user',
                        attributes: ['userId', 'userName', 'profilePicUrl']
                    }]
                },
                {
                    model: User,
                    as: 'user',
                    attributes: { exclude: ["password"] }
                },
                {
                    model: Track,
                    as: 'track',
                },

            ]
            // include: {all: true}
        });
        console.log(postInfo);

        if (postInfo) {
            res.status(200).json(postInfo);
        } else {
            res.status(404).send(`Post  with id ${postId} not found.`);
        }

    } catch (error) {
        next(error);
    }
});

router.get("/users/:userId", async (req, res, next) => {
    try {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ error: "User ID must be provided" });

        const userPosts = await Post.findAll({
            where: {
                userId: userId
            },
            include: [
                {
                    model: Comment,
                    as: 'comments',
                    include: [{
                        model: User,
                        as: 'user',
                        attributes: ['userId', 'userName', 'profilePicUrl']
                    }]
                },
                {
                    model: User,
                    as: 'user',
                    attributes: { exclude: ["password"] }
                },
                {
                    model: Track,
                    as: 'track',
                },

            ],
            order: [['createdAt', 'DESC']]

        });

        if (userPosts) {
            res.status(200).json(userPosts);
        } else {
            res.status(404).send(`Posts with userId ${userId} not found`);
        }

    } catch (error) {
        next(error);
    }
});

router.get("/:postId/isliked/:userId", async (req, res, next) => {
    try {
        const { postId, userId } = req.params;
        if (!postId || !userId) return res.status(400).json({ error: "User ID & Post ID must be provided" });
        const liked = await Like.findOne({
            where: {
                postId: postId,
                userId: userId
            }
        }) ? true : false;

        res.status(200).send(liked);

    } catch (error) {
        next(error);
    }
});

router.get("/:postId/comments", async (req, res, next) => {
    try {
        const { postId } = req.params;
        if (!postId) return res.status(400).json({ error: "Post ID must be provided" });
        const comments = await Comment.findAll({
            where: {
                postId: postId
            },
            include: {
                all: true,
                nested: true
            }
        });
        if (postId) {
            res.status(200).json(comments);
        } else {
            res.status(404).send(`Comments are not find with ${postId} Post ID.`);
        }

    } catch (error) {
        next(error)
    }
});

router.post("/:postId/comments/create/:userId", async (req, res, next) => {
    try {
        const { text, parentId } = req.body;
        const { postId, userId } = req.params;
        if (!text || !postId || !userId)
            return res.status(400).json({ error: "You must provide data to create a comment" });
        const newCommentData = {
            text,
            postId,
            userId,
            parentId: parentId ? parentId : null
        }

        const comment = await Comment.create(newCommentData);
        const commentData = await Comment.findByPk(comment.commentId, {
            include: [{
                model: User,
                as: 'user',
                attributes: ['userId', 'userName', 'profilePicUrl']
            }]
        });
        if (commentData) {
            res.status(200).json(commentData);
        } else {
            res.status(500).send('Failed to create the comment');
        }
    } catch (error) {
        next(error)
    }
})

router.post("/create", async (req, res, next) => {
    try {
        const newPostData = req.body;
        if (!newPostData) return res.status(400).json({ error: "You must provide data to create a post" });
        const post = await Post.create(newPostData, {
            returning: true
        });
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(500).send('Failed to create the post');
        }
    } catch (error) {
        next(error);
    }
});

router.post("/:postId/like/:userId", async (req, res, next) => {
    try {
        const { postId, userId } = req.params;
        //let created
        if (!postId || !userId) return res.status(400).json("PostID and UserID must be provided");

        const [likedPost, created] = await Like.findOrCreate({
            where: {
                postId,
                userId
            },
            defaults: {
                userId,
                postId
            }
        });

        if (created) {
            // Increment the likesCount of the Post if the like was created
            const post = await Post.findByPk(postId);
            await post.update({
                likesCount: post.likesCount + 1
            });
        } else {
            throw new Error("The like was not created.");
        }

        // Get the updated number of likes for this post after adding one
        const updatedPost = await Post.findByPk(postId);

        if (!likedPost || !updatedPost) { return res.status(401).send("Internal server error on creating like") };

        return res.status(200).json(updatedPost);

        // Get the updated number of likes for this post after adding one
    } catch (error) {
        next(error)
    }
})

router.put("/:postId/update", async (req, res, next) => {
    try {
        const { postId } = req.params;
        const updateData = req.body;
        if (!postId || !updateData) return res.status(400).json({ error: "Missing required fields" });

        const updatedPost = await Post.update(updateData, {
            where: { id: postId },
            returning: true,
        });

        if (updatedPost) {
            res.status(200).json(updatedPost[1][0]);
        } else {
            res.status(404).json({ error: "No post found with this id for updating" });
        }

    } catch (error) {
        next(error);
    }

});

router.delete("/:postId/delete", async (req, res, next) => {
    try {
        const { postId } = req.params;
        if (!postId) return res.status(400).json({ error: `Post ID must be provided` });

        const deletedPost = await Post.destroy({
            where: {
                id: postId
            }
        });
        if (deletedPost) {
            res.status(200).json(deletedPost);
        } else {
            res.status(404).json({ error: 'No post found with this id' });
        }
    } catch (error) {
        next(error);
    }
});

router.delete("/:postId/removeLike/:userId", async (req, res, next) => {
    try {
        const { postId, userId } = req.params;
        if (!userId || !postId) return res.status(400).json({ error: "User Id and Post Id must be provided" });

        const removedLike = await Like.destroy({
            where: {
                userId: userId,
                postId: postId
            },
        });
        if (removedLike) {
            const updatedPost = await Post.findByPk(postId);
            if (updatedPost) {
                const updatedPostReducedLike = await updatedPost.update({
                    likesCount: updatedPost.likesCount - 1
                });
                res.status(200).json(updatedPostReducedLike);
            } else {
                res.status(404).send(`Post with postId ${postId} not found`);
            }
        } else {
            res.status(404).send(`Like not found for postId ${postId} and userId ${userId}`);
        }

    } catch (error) {
        next(error)
    }
});



module.exports = router;