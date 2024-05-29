import express from 'express';

import { addMaterialExchange, 
    getAllMaterial,
     getMaterialById,
     acceptMaterialRequest,
    deleteMaterialExchange,
     updateMaterialExchange,
     searchByType,
     searchByKeyword} from '../controllers/exchangeController.js';
import authMiddleware  from '../middleware/auth.js'; 
const exchange = express.Router();

exchange.post('/materials',authMiddleware,addMaterialExchange);// add a new material request
exchange.get('/materials',authMiddleware,getAllMaterial);//get all material information
exchange.get('/materials/:id',authMiddleware,getMaterialById);//get specific Material Information
exchange.put('/materials/:id/accept',authMiddleware,acceptMaterialRequest);//accept Material
exchange.delete('/materials/:id',authMiddleware,deleteMaterialExchange);//accept Material
exchange.patch('/materials/:id',authMiddleware, updateMaterialExchange);
exchange.get('/materials/search/type', authMiddleware, searchByType);
exchange.get('/materials/search/keyword', authMiddleware, searchByKeyword);



export default exchange;