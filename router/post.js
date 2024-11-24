import express from 'express';
import { addComment, createPost, editPost, deletePost, deleteComment,  } from '../controller/post.js';
import {MyError} from '../classes/MyError.js'
import { asyncHandler } from '../utils/asyncHandler.js';
import Post from '../model/post.js';
import Comment from '../model/comment.js';

export const postRouter = express.Router();

postRouter.post('/create', asyncHandler(async(req, res) => {
  try {
    // Vérifier la présence du titre et du contenu
    if (req.body.titre && req.body.contenu) {
      await createPost(req.body.titre, req.body.contenu, req.userId);
      res.status(201).json();
      console.log("Post créé");
    } else {
      throw new MyError(400, "Post non créé");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}));
  
postRouter.put('/edit/:id',asyncHandler(async(req, res)=>{
    try {
        await editPost(req.params.id, req.body.titre, req.body.contenu);
        res.status(201).json();
        console.log("post modifier");
    } catch (err) {
        console.log(err);
        throw new MyError(400, "post non modifier");
    }
}));

postRouter.post('/:id/comment', asyncHandler(async(req, res) => {
  try {
    const UserId = req.userId;

    // Vérifier la présence du titre et du contenu
    if ( req.body.contenu) {
      await addComment(req.body.contenu, req.params.id, UserId);
      res.status(201).json();
      console.log("Commentaire créé");
    } else {
      throw new MyError(400, "Commentaire non créé");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}));

postRouter.get('/show', asyncHandler(async(req, res) => {
  try {
   
    const UserId = req.userId;
    const posts = await getPosts(UserId);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}));