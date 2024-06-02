import express from 'express';
import authMiddleware  from '../middleware/auth.js'; 

import { addGarden} from '../controllers/gardenCreation.js';

const gardenRouter = express.Router();

gardenRouter.post('/',authMiddleware,addGarden);

export default gardenRouter;