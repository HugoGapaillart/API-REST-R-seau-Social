import User from '../model/user.js';
import Follow from '../model/follow.js';
import Post from '../model/post.js';
import Comment from '../model/comment.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MyError } from '../classes/MyError.js'

const salt = 10;
const secret = "P4$$w0rD";

function crypt(psw){
    return new Promise((resolve, reject)=>{
        bcrypt.hash(psw, salt, function(err, hash) {
            if (err) reject(err);
            else resolve(hash);
        });
    })
}

function decrypt(psw, hash){
    return new Promise((resolve, reject)=>{
        bcrypt.compare(psw, hash, function(err, result) {
            if (err) reject(err);
            else if (result) resolve(true)
            else reject (new MyError(403, "utilisateur ou mot de passe incorrect"))
        });
    })
}

export async function createUser(mail, psw){
    try {
        const user = await User.create({
            mail: mail,
            psw: await crypt(psw)
            
        })
    } catch (err) {
        console.log(err.message)
        throw new MyError(500, err.message) 
    }
}

export async function connectUser(mail, psw){
    try {
        const user = await User.findOne({
            where: {
                mail: mail
            }
        })
        const hash = await decrypt(psw, user?.psw ?? "");
        const token = jwt.sign({id: user.id}, secret);
        return token;
    } catch (err) {
        console.log(err.message)
        throw new MyError(500, err.message)
    }
}

export async function editUser(userId, nom, prenom, photo, mail, psw) {
    try {
        const user = await User.update( {
            nom: nom,
            prenom : prenom,
            photo: photo,
            mail : mail,
            psw : await crypt(psw)
        }, {
            where: {
                id: userId
            }})
    } catch (err) {
        console.log(err.message)
        throw new MyError(500, err.message)
    }
}

export async function followUser(followId, followedId){
    try {
        const follow = await Follow.create({
            followId: followId,
            followedId: followedId
        })
    } catch (err) {
        console.log(err)
        console.log(err.message)
        throw new MyError(500, err.message)
    }
}

export async function friendPost(user) {
    const friend = await Follow.findAll({
        where: {
            followId: user
        }
    });

    const allFriend = friend.map(follow => follow.followedId);

    const friendPost = await Post.findAll({
        where: {
            userId: allFriend
            },
        order: [
            ['createdAt', 'DESC']
        ],
        attributes: ['titre', 'contenu'],
        include: [
            {
                model: Comment,
                order: [
                    ['createdAt', 'DESC']
                ],
                attributes: ['contenu'],
            }
        ]
    });
    return friendPost;
}
export async function deleteUser(userId){
    try {
        await User.destroy({
            where: {
                id: userId
            }
        });
        await Post.destroy({
            where: {
                UserId: userId
            }
        });
        await Comment.destroy({
            where: {
                UserId: userId
            }
        });
    } catch (err) {
        console.log(err);
        console.log(err.message)
        throw new MyError(500, err.message)
    }
}