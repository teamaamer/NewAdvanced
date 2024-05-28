import express from 'express';

import { addMaterialExchange, getAllMaterial, getMaterialById, acceptMaterialRequest} from '../controllers/exchangeController.js';
import authMiddleware  from '../middleware/auth.js'; 
const exchange = express.Router();

exchange.post('/material',authMiddleware,addMaterialExchange);// add a new material request
exchange.get('/material',authMiddleware,getAllMaterial);//get all material information
exchange.get('/material/:id',authMiddleware,getMaterialById);//get Material Information
exchange.post('/material/:id',authMiddleware,acceptMaterialRequest);//accept Material


export default exchange;