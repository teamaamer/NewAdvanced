import express from 'express';
const router = express.Router();

import { addService, updateService, deleteService,getAllServices, getServiceById, getServicesByUser,searchByProviderName,searchByName,searchByType } from '../controllers/prosercon.js';

router.post('/', addService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);
router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.get('/user/:userId', getServicesByUser);
router.get('/provider/:providerName', searchByProviderName);
router.get('/name/:name', searchByName);
router.get('/type/:type', searchByType);

export default router;