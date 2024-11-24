import express from 'express';
import { deleteComment } from '../controller/post.js';
import {MyError} from '../classes/MyError.js'
import { asyncHandler } from '../utils/asyncHandler.js';

export const commentRouter = express.Router();

commentRouter.delete('/:id/delete', asyncHandler(async(req, res)=>{
    try {
        const UserId = req.userId;
        const comments = await deleteComment(req.params.id, UserId);
        res.status(200).json();
        console.log("commentaire supprimé");
    } catch (err) {
        console.log(err);
        throw new MyError(400, "commentaire non supprimé");
    }
}));