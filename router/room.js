import express from 'express';
import {MyError} from '../classes/MyError.js'
import { asyncHandler } from '../utils/asyncHandler.js';
import { createRoom } from '../controller/room.js';

export const roomRouter = express.Router();

roomRouter.post('/:id',asyncHandler(async(req, res)=>{
  try {
    const UserId = req.userId;

    await createRoom(req.params.id, UserId);
    res.status(201).json();
    console.log("room creer");
  } catch (err) {
    console.log(err);
    throw new MyError(400, "room non creer");
  }
}));