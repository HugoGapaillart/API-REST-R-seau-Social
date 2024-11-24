import Post from "../model/post.js";
import Comment from "../model/comment.js";
import { MyError } from '../classes/MyError.js';


export async function createPost(titre, contenu, UserId){
    try {
        const post = await Post.create({
            titre: titre,
            contenu: contenu,
            UserId  
        })
    } catch (err) {
        console.log(err.message)
        throw new MyError(500, err.message) 
    }
}

export async function editPost(postId, titre, contenu) {
    try {
        const post = await Post.update( {
            titre: titre,
            contenu: contenu
        }, {
            where: {
                id: postId
            }})
    } catch (err) {
        console.log(err.message)
        throw new MyError(500, err.message)
    }
}

export async function deletePost(postId, userId){
    try {
        const postToDelete = await Post.findOne({
            where: {
                id: postId,
                UserId: userId
            }
        });
        postToDelete.destroy();
        await Comment.destroy({
            where: {
                PostId: postId
            }
        });
    } catch (err) {
        console.log(err);
        console.log(err.message)
        throw new MyError(500, err.message)
    }
}

export async function addComment(contenu, postId, userId){
    try {
        const comment = await Comment.create({
            contenu: contenu,
            PostId: postId,
            UserId: userId
        });
    } catch (err) {
        console.log(err.message)
        throw new MyError(500, err.message)
    }
}

export async function deleteComment(commentId, userId){
    try {
        const commentToDelete = await Comment.findOne({
            where: {
                id: commentId,
                UserId: userId
            }
        });
        commentToDelete.destroy();
    } catch (err) {
        console.log(err);
        console.log(err.message)
        throw new MyError(500, err.message)
    }
}

export async function getPost(userId) {
    try {
        const posts = await Post.findAll({
            where: {
                userId: userId
            },
            order: [
                ['createdAt', 'DESC']
            ],
            include: [
                {
                    model: Comment,
                    order: [
                        ['createdAt', 'DESC']
                    ]
                }
            ]
        });

        return posts;
    } catch (err) {
        console.error(err);
        throw new MyError(500, err.message);
    }
}