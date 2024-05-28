import express from 'express';

import { addMaterialExchange, getAllMaterial, getMaterialById, acceptMaterialRequest, deleteMaterialExchange, updateMaterialExchange } from '../controllers/exchangeController.js';
import authMiddleware  from '../middleware/auth.js'; 
const exchange = express.Router();

exchange.post('/material',authMiddleware,addMaterialExchange);// add a new material request
exchange.get('/material',authMiddleware,getAllMaterial);//get all material information
exchange.get('/material/:id',authMiddleware,getMaterialById);//get specific Material Information
exchange.put('/material/:id',authMiddleware,acceptMaterialRequest);//accept Material
exchange.delete('/material/:id',authMiddleware,deleteMaterialExchange);//accept Material
exchange.patch('/material/:id',authMiddleware, updateMaterialExchange);



export default exchange;