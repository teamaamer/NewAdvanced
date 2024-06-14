import express from 'express';
const router = express.Router();

import {addAdvice,getAllAdvices, getAdvicesById,getAdviceByTitle, updateAdvice, deleteAdvice } from '../controllers/advicecon.js';

router.post('/',addAdvice);
router.get('/', getAllAdvices);
router.get('/:id', getAdvicesById);
router.get('/title', getAdviceByTitle);
router.put('/:id', updateAdvice);
router.delete('/:id', deleteAdvice);

export default router;