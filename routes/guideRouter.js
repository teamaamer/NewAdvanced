// routes/guideRouter.js
import express from 'express';
import { addGuide, getAllGuides, getGuideById, getGuideByTitle, updateGuide, deleteGuide } from '../controllers/guideController.js';
import authMiddleware from '../middleware/auth.js';

const guideRouter = express.Router();

guideRouter.post('/addguide', authMiddleware, addGuide);
guideRouter.get('/getguides', authMiddleware, getAllGuides);
guideRouter.get('/getguidesid/:id', authMiddleware, getGuideById);
guideRouter.get('/getguidestt', authMiddleware, getGuideByTitle);
guideRouter.put('/getguidesupda/:id', authMiddleware, updateGuide);
guideRouter.delete('/deleteguide/:id', authMiddleware, deleteGuide);

export default guideRouter;

