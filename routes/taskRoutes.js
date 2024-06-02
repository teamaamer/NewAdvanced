import express from 'express';
import authMiddleware  from '../middleware/auth.js'; 

import {addTask} from '../controllers/TaskController.js';

const taskRouter = express.Router();


export default taskRouter;