import Event from '../models/eventModel.js';

import {updateEvent, deleteEvent, getAllEvents, getEventById, searchEventsByCity} from '../controllers/eventController.js';
import { joinEvent, leaveEvent, getEventParticipants} from '../controllers/eventParticipants.js';
import {requestSponsorship} from '../controllers/sponcershipController.js';
import authMiddleware from '../middleware/auth.js';

import express from 'express';

const eventRouter = express.Router();

// eventRouter.post('/', addGeneralEvent);

eventRouter.get('/',authMiddleware,getAllEvents);
eventRouter.get('/:eventId',authMiddleware, getEventById);
eventRouter.put('/:eventId',authMiddleware, updateEvent);
eventRouter.delete('/:eventId',authMiddleware, deleteEvent);
eventRouter.get('/search/city', authMiddleware, searchEventsByCity);
eventRouter.get('/:eventId/participants',authMiddleware, getEventParticipants);

eventRouter.post('/:eventId/join',authMiddleware, joinEvent);
eventRouter.post('/:eventId/leave',authMiddleware, leaveEvent);

eventRouter.post('/:eventId/sponsorship',authMiddleware, requestSponsorship);


export default eventRouter;
