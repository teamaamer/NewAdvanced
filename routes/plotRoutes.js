// routes/plotRoutes.js
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

const router = express.Router({ mergeParams: true });

router.post('/', authMiddleware, addPlot);
router.put('/:id', authMiddleware, updatePlot);
router.delete('/:id', authMiddleware, deletePlot);
router.get('/', authMiddleware, getAllPlotsByGardenId);
router.get('/:id', authMiddleware, getPlotById);

export default router;
