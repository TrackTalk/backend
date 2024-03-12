const Comment = require("./comment");
const Conversation = require("./conversation");
const FavoriteTracks = require("./favoriteTracks");
const Follow = require("./follow");
const Like = require("./like");
const Message = require("./message");
const Post = require("./post");
const Track = require("./track");
const User = require("./user");

// User.hasMany(Post);
Post.belongsTo(User, {foreignKey: "userId"});

// Track.hasMany(Post);
Post.belongsTo(Track, {foreignKey: "trackId"});

// Post.hasMany(Comment);
Comment.belongsTo(Post, {foreignKey: "postId"});

// User.hasMany(Comment);
Comment.belongsTo(User, {foreignKey: "userId"});

// Conversation.hasMany(Message);
Message.belongsTo(Conversation, {foreignKey:  "conversationId"});

// User.hasMany(Message);
Message.belongsTo(User, {foreignKey: "userId"});

// User.belongsTo(Track, {foreignKey: " currentlyListeningId"});
Track.hasMany(User, { foreignKey: 'currentlyListeningId' });

User.belongsToMany(Post, { through: Like, foreignKey: "userId", otherKey: "postId"});
Post.belongsToMany(User, { through: Like, foreignKey: "postId", otherKey: "userId"});

User.belongsToMany(Track, { through: FavoriteTracks, foreignKey: "userId", otherKey: "trackId"});
Track.belongsToMany(User, { through: FavoriteTracks, foreignKey: "trackId", otherKey: "userId"});

User.belongsToMany(User, { as: "user1Id", through: Conversation, foreignKey: "user1Id", otherKey: "user2Id"});
User.belongsToMany(User, { as: "user2Id", through: Conversation, foreignKey: "user2Id", otherKey: "user1Id"});

User.belongsToMany(User, { as: "followerId", through: Follow, foreignKey: "followerId", otherKey: "followingId"});
User.belongsToMany(User, { as: "followingId", through: Follow, foreignKey: "followingId", otherKey: "followerId"});

module.exports = {
    Comment,
    Conversation,
    FavoriteTracks,
    Follow,
    Like,
    Message,
    Post,
    Track,
    User
}