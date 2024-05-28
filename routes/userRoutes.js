import express from 'express';

import {userRegister, userLogin} from '../controllers/userRegController.js';

const userRouter = express.Router();

userRouter.post("/signup", userRegister);
userRouter.post("/Login", userLogin);


export default userRouter;