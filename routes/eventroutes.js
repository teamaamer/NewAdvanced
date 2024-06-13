import express from 'express';
const router = express.Router();

import { getAllEventParticipants, getEventParticipantById, addEventParticipant, updateEventParticipant, deleteEventParticipant } from '../controllers/eventPController.js';

router.get('/', getAllEventParticipants);
router.get('/:id', getEventParticipantById);
router.post('/', addEventParticipant);
router.put('/:id', updateEventParticipant);
router.delete('/:id', deleteEventParticipant);

export default router;
