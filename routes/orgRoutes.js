import express from 'express';
import authMiddleware  from '../middleware/auth.js'; 


import { getAllOrganizations, getOrganizationById, searchOrganizationByName } from '../controllers/orgControllers.js';
// import {getAllSponsorshipRequestsForOrganization, getSponsorshipRequestById, updateRequestStatus} from '../controllers/sponcershipController.js';

const orgRouter = express.Router();

orgRouter.get('/', authMiddleware, getAllOrganizations);

orgRouter.get('/:organizationId', authMiddleware, getOrganizationById);

orgRouter.get('/search/name', authMiddleware, searchOrganizationByName);


export default orgRouter;