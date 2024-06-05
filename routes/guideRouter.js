// routes/guideRouter.js
import express from 'express';
import { addGuide, getAllGuides, getGuideById, getGuideByTitle, updateGuide, deleteGuide } from '../controllers/guideController.js';
import authMiddleware from '../middleware/auth.js';

const guideRouter = express.Router();

guideRouter.post('/', authMiddleware, addGuide);
guideRouter.get('/', authMiddleware, getAllGuides);
guideRouter.get('/:id', authMiddleware, getGuideById);
guideRouter.get('/title/:title', authMiddleware, getGuideByTitle);
guideRouter.put('/:id', authMiddleware, updateGuide);
guideRouter.delete('/:id', authMiddleware, deleteGuide);

export default guideRouter;

