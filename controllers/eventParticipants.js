import EventParticipant from "../models/eventParticipant.js";
import Event from "../models/eventModel.js";
import User from "../models/userModel.js";

export async function joinEvent(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    const userId = req.user.id;
    const { eventId } = req.params;
    const type = req.user.type;

    if (type !== 'Volunteer') {
        return res.status(403).json({ error: 'Only volunteers can join events' });
    }

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const username = user.Username;

        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const participantsCount = await EventParticipant.count({
            where: { EventID: eventId }
        });

        if (participantsCount >= event.MaxMembers) {
            return res.status(400).json({ error: 'Event is at full capacity' });
        }

        const existingParticipant = await EventParticipant.findOne({
            where: {
                EventID: eventId,
                UserID: userId,

            }
        });

        if (existingParticipant) {
            return res.status(409).json({ error: 'User is already a participant in this event' });
        }

        const newParticipant = await EventParticipant.create({
            EventID: eventId,
            UserID: userId,
            UserName: username
        });

        res.status(201).json({
            message: 'Successfully joined the event',
            participant: {
                ...newParticipant.get({ plain: true }),
                UserName: username 
            }
        });
    } catch (error) {
        console.error('Error joining event:', error);
        res.status(500).json({ error: 'Failed to join event' });
    }
}


export async function leaveEvent(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    const userId = req.user.id;
    const { eventId } = req.params;

    try {
        const participant = await EventParticipant.findOne({
            where: {
                EventID: eventId,
                UserID: userId
            }
        });

        if (!participant) {
            return res.status(404).json({ error: 'Participant not found in this event' });
        }

        await participant.destroy();
        res.status(200).json({ message: 'Successfully left the event' });
    } catch (error) {
        console.error('Error leaving event:', error);
        res.status(500).json({ error: 'Failed to leave event' });
    }
}

export async function getEventParticipants(req, res) {
    const { eventId } = req.params;

    try {
        const participants = await EventParticipant.findAll({
            where: { EventID: eventId },
            attributes: ['EventParticipantID', 'UserID', 'UserName']
        });

        if (participants.length > 0) {
            res.status(200).json(participants);
        } else {
            res.status(404).json({ message: 'No participants found for this event' });
        }
    } catch (error) {
        console.error('Error retrieving event participants:', error);
        res.status(500).json({ error: 'Failed to retrieve participants' });
    }
}
