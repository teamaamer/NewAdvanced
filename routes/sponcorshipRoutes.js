import express from 'express';
import authMiddleware  from '../middleware/auth.js'; 

import { getAllSponsorshipRequestsForOrganization, getSponsorshipRequestById, updateRequestStatus } from '../controllers/sponcershipController.js';

const sponRouter = express.Router();

sponRouter.get('/', authMiddleware, getAllSponsorshipRequestsForOrganization);

sponRouter.get('/:requestId', authMiddleware, getSponsorshipRequestById);

sponRouter.put('/:requestId/status', authMiddleware, updateRequestStatus);

export default sponRouter;