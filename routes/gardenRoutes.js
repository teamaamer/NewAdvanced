import express from 'express';
import authMiddleware  from '../middleware/auth.js'; 

import { addGarden} from '../controllers/gardenCreation.js';
import { addTask, getTasksByGardenId,getTaskById, updateTask, deleteTask} from '../controllers/TaskController.js';
import { joinGarden } from '../controllers/gardenMemebrCont.js';
import { assignTask,updateTaskStatus} from '../controllers/taskAssignment.js';

const gardenRouter = express.Router();

gardenRouter.post('/',authMiddleware,addGarden);
gardenRouter.post('/:gardenId/tasks',authMiddleware,addTask);
gardenRouter.get('/:gardenId/tasks',authMiddleware,getTasksByGardenId);
gardenRouter.get('/:gardenId/tasks/:taskId',authMiddleware,getTaskById);
gardenRouter.put('/:gardenId/tasks/:taskId',authMiddleware,updateTask);
gardenRouter.delete('/:gardenId/tasks/:taskId',authMiddleware,deleteTask);

gardenRouter.post('/:gardenId/join',authMiddleware,joinGarden);

gardenRouter.post('/:gardenId/tasks/:taskId/assign',authMiddleware,assignTask);

gardenRouter.put('/:gardenId/tasks/:taskId/status',authMiddleware,updateTaskStatus);

export default gardenRouter;