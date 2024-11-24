import express from 'express';
import { deleteUser, editUser, followUser, friendPost } from '../controller/user.js';
import {MyError} from '../classes/MyError.js'
import { asyncHandler } from '../utils/asyncHandler.js';

export const userRouter = express.Router();

userRouter.put('/edit',asyncHandler(async(req, res)=>{
  try {
    const UserId = req.userId;

    await editUser(UserId, req.body.nom, req.body.prenom, req.body.photo, req.body.mail, req.body.psw);
    res.status(201).json();
    console.log("modifier");
  } catch (err) {
    console.log(err);
    throw new MyError(400, "pas modifier");
  }
}));

userRouter.post('/follow/:id', asyncHandler(async(req, res)=>{
  try {
    const UserId = req.userId;
    
    await followUser(UserId, req.params.id);
    res.status(201).json();
    console.log("vous suivez cette personne");
  } catch (err) {
    console.log(err);
    throw new MyError(400, "vous n'avez pas pu suivre cette personne");
  }
}))

userRouter.get('/show', asyncHandler(async(req, res) => {
  try {
    const UserId = req.userId;
    const result = await friendPost(UserId);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}));

userRouter.delete('/delete', asyncHandler(async(req, res) =>{
  try {
    const UserId = req.userId;
    const userDelete = await deleteUser(UserId);
    res.status(200).json();
    console.log("utilisateur supprimé");
  } catch (err) {
    console.log(err);
    throw new MyError(400, "utilisateur non supprimé");
  }
}))