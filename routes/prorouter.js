import express from 'express';
const router = express.Router();

import { addProduct,updateProduct,deleteProduct,getAllProducts, getProductById,getProductsByUser,searchByProviderName,searchByName,searchByType } from '../controllers/prosercon.js';

router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/user/:userId', getProductsByUser);
router.get('/provider/:providerName', searchByProviderName);
router.get('/name/:name', searchByName);
router.get('/type/:type', searchByType);

export default router;