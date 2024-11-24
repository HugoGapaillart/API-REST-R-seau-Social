import express from 'express';
import { createUser, connectUser } from '../controller/user.js';
import {MyError} from '../classes/MyError.js'
import { asyncHandler } from '../utils/asyncHandler.js';
import User from '../model/user.js';

export const authUserRouter = express.Router();

authUserRouter.post('/login', asyncHandler(async(req, res) => {
  if(req.body.mail && req.body.psw){
    const token = await connectUser(req.body.mail, req.body.psw);
    res.status(200).json({ token });
  }
  else{
    throw new MyError(400, "Merci de transmettre un mail et un mot de passe");
  }
}));

authUserRouter.post('/register', asyncHandler(async(req, res) => {
  try{
    if(req.body.mail && req.body.psw){
      const user = User.findOne({
        where: {
          mail: req.body.mail
        }
      })
      if(user){
        console.log("adresse mail déjà utilisé")
      }
      await createUser(req.body.mail, req.body.psw);
      res.status(201).json();
    }
    else{
      throw new MyError(400, "je suis le probleme");
    }
  }
  catch(err){
    console.log(err)
  }
}));
