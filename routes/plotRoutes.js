// routes/plotRoutes.js
import express from 'express';
import {
  addPlot,
  updatePlot,
  deletePlot,
  getAllPlotsByGardenId,
  getPlotById,
} from '../controllers/plotController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/plots', authMiddleware, addPlot);
router.put('/plots/:id', authMiddleware, updatePlot);
router.delete('/plots/:id', authMiddleware, deletePlot);
router.get('/plots/garden/:gardenId', authMiddleware, getAllPlotsByGardenId);
router.get('/plots/:id', authMiddleware, getPlotById);

export default router;
