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

exchange.post('/',authMiddleware,addMaterialExchange);// add a new material request
exchange.get('/',authMiddleware,getAllMaterial);//get all material information
exchange.get('/:id',authMiddleware,getMaterialById);//get specific Material Information
exchange.put('/:id/accept',authMiddleware,acceptMaterialRequest);//accept Material
exchange.delete('/:id',authMiddleware,deleteMaterialExchange);//accept Material
exchange.put('/:id',authMiddleware, updateMaterialExchange);
exchange.get('/search/type', authMiddleware, searchByType);
exchange.get('/search/keyword', authMiddleware, searchByKeyword);



export default exchange;