import express from 'express';
import authMiddleware  from '../middleware/auth.js'; 

import { addGarden} from '../controllers/gardenCreation.js';
import { addTask } from '../controllers/TaskController.js';

const gardenRouter = express.Router();

gardenRouter.post('/',authMiddleware,addGarden);
gardenRouter.post('/:gardenId/tasks',authMiddleware,addTask);

export default gardenRouter;