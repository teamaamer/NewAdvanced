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

plotRouter.post('/plots', authMiddleware, addPlot);
plotRouter.put('/plots/:id', authMiddleware, updatePlot);
plotRouter.delete('/plots/:id', authMiddleware, deletePlot);
plotRouter.get('/plots/garden/:gardenId', authMiddleware, getAllPlotsByGardenId);
plotRouter.get('/plots/:id', authMiddleware, getPlotById);

export default plotRouter;
