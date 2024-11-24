import User from "../model/user.js";
import Post from "../model/post.js";
import Comment from "../model/comment.js";
import Follow from "../model/follow.js";
import Message from "../model/message.js";
import Room from "../model/room.js";

User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.hasMany(Comment);
Comment.belongsTo(User);

User.belongsToMany(User, {through: Follow, as:"follower"});
User.belongsToMany(User, {through: Follow, as:"followed"});

User.hasMany(Message, {foreignKey: 'senderId'});
Message.belongsTo(User, {foreignKey: 'senderId'});

Room.hasMany(Message, {foreignKey: 'roomId'});
Message.belongsTo(Room, {foreignKey: 'roomId'});

Room.belongsToMany(User, { through: 'RoomUsers', foreignKey: 'roomId' });
User.belongsToMany(Room, { through: 'RoomUsers', foreignKey: 'userId' });