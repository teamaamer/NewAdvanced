import express from 'express';

import {userRegister, userLogin} from '../controllers/userRegController.js';
import {forgotPassword, verifyCode, resetPassword} from '../controllers/forgotPasswordController.js';

const userRouter = express.Router();

userRouter.post("/signup", userRegister);
userRouter.post("/Login", userLogin);

userRouter.post("/forgotPassword", forgotPassword);

userRouter.post("/:userId/verifyCode", verifyCode);

userRouter.post("/:userId/resetPassword", resetPassword);


export default userRouter;