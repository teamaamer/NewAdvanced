import EventP from '../models/event.js';

export const addEventParticipant = async (req, res) => {
  try {
    const { EventID, UserID, UserName } = req.body;
    const newParticipant = await EventP.create({ EventID, UserID, UserName });
    res.status(201).json(newParticipant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add event participant' });
  }
};

export const getAllEventParticipants = async (req, res) => {
  try {
    const participants = await EventP.findAll();
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event participants' });
  }
};

export const getEventParticipantById = async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await EventP.findByPk(id);
    if (participant) {
      res.status(200).json(participant);
    } else {
      res.status(404).json({ error: 'Event participant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event participant' });
  }
};

export const updateEventParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const { EventID, UserID, UserName } = req.body;
    const participant = await EventP.findByPk(id);
    if (participant) {
      participant.EventID = EventID;
      participant.UserID = UserID;
      participant.UserName = UserName;
      await participant.save();
      res.status(200).json(participant);
    } else {
      res.status(404).json({ error: 'Event participant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event participant' });
  }
};

export const deleteEventParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await EventP.findByPk(id);
    if (participant) {
      await participant.destroy();
      res.status(200).json({ message: 'Event participant deleted successfully' });
    } else {
      res.status(404).json({ error: 'Event participant not found' });
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event participant' });
  }
};