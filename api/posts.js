const router = require("express").Router();
const {Post, User, Like, Comment} = require("../db/models");

//root is localhost:8000/api/posts

router.get("/:postId", async (req, res, next) => {
    try {
        const {postId} = req.params;
        if(!postId) return res.status(400).json({ error: "Post ID must be provided" });

        const postInfo = await Post.findByPk(postId, {
            include: {all: true, nested: true}
        });

        if(postInfo){
            res.status(200).json(postInfo);
        } else {
            res.status(404).send(`Post  with id ${postId} not found.`);
        }

    } catch (error) {
        next(error);
    }
});

router.get("/users/:userId", async(req, res, next) => {
    try {
        const {userId} = req.params;
        if(!userId) return res.status(400).json({ error: "User ID must be provided" });
        
        const userPosts = await Post.findAll({
            where: {
                userId: userId
            },
            include: {
                all: true,
                nested: true
            }
        });

        if(userPosts) {
            res.status(200).json(userPosts);
        } else {
            res.status(404).send(`Posts with userId ${userId} not found`);
        }

    } catch (error) {
        next(error);
    }
});

router.get("/:postId/isliked/:userId", async (req, res, next) =>{
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
        if(!postId) return res.status(400).json({ error: "Post ID must be provided" });
        const comments = await Comment.findAll({
            where:{
              postId: postId
            },
            include: {
                all: true,
                nested: true
            }
        });
        if(postId) {
            res.status(200).json(comments);
        } else {
            res.status(404).send(`Comments are not find with ${postId} Post ID.`);
        }

    } catch (error) {
        next(error)
    }
});

router.post("/create", async (req, res, next) => {
    try {
        const newPostData = req.body;
        if(!newPostData) res.status(400).json({error: "You must provide data to create a comment."});
        const post = await Post.create(newPostData, {
            returning: true
        });
        if(post){
            res.status(200).json(post[1]);
        } else {
            res.status(500).send('Failed to create the post');
        }
    } catch (error) {
        next(error);
    }
});

router.put("/:postId/update", async (req, res, next) => {
    try {
        const {postId} = req.params;
        const updateData = req.body;
        if( !postId || !updateData ) return res.status(400).json( {"Error": "Missing required fields"} ); 
        
        const updatedPost = await Post.update(updateData, {
            where: {id: postId},
            returning: true,
        });
    
        if (updatedPost){
            res.status(200).json(updatedPost[1][0]);
        }else{
            res.status(404).json({"Error":"No post found with this id for updating"});
        }

    } catch (error) {
        next(error);
    }

});

router.delete("/:postId/delete", async (req, res, next) => {
    try {
        const {postId} = req.params;
        if(!postId)  return res.status(400).json( {error: `Post ID must be provided`} );

        const deletedPost = await Post.destroy({
            where:{
                id : postId
            }
        });
        if(deletedPost) {
            res.status(200).json(deletedPost);
        } else {
            res.status(404).json({ error: 'No post found with this id'});
        }
    } catch (error) {
        next (error);
    }
});

module.exports = router;