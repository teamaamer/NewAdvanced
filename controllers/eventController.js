import Event from '../../models/eventModel.js';
import Garden from '../../models/gardenModel.js';
import { Sequelize } from 'sequelize';

export async function addEvent(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    
    const userId = req.user.id;
    const type = req.user.type; 
    const { gardenId } = req.params;
    
    if (type !== 'Manager') {
        return res.status(400).json({ error: 'Not permitted to add event' }); 
    }

    const garden = await Garden.findByPk(gardenId);
    if (!garden) {
        return res.status(404).json({ error: 'Garden not found' });
    }
    
    if (garden.ManagerID !== userId) {
        return res.status(403).json({ error: 'Not permitted to add event to this garden' }); 
    }
    
    const { name, description, startDate, endDate, maxMembers, location, city} = req.body;
    if (!name || !description || !startDate || !endDate || !maxMembers || !location || !city) {
        return res.status(400).json({ error: 'All required fields must be provided' });
    }

    const existingEvent = await Event.findOne({
        where: { Name: name, GardenID: gardenId, StartDate: startDate }
    });

    if (existingEvent) {
        return res.status(400).json({ error: 'Event already exists' }); 
    }

    const event = await Event.create({
        Name: name,
        Description: description,
        // OrganizerID: userId,
        StartDate: new Date(startDate), 
        EndDate: new Date(endDate), 
        MaxMembers: maxMembers,
        Location: location,
        GardenID: gardenId,
        city: city,
        ManagerID: userId
    });

    res.status(201).json({
        message: "Event created successfully",
        Event: event
    });
}

export async function updateEvent(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    
    const userId = req.user.id;
    const type = req.user.type;
    const { eventId } = req.params;
    
    if (type !== 'Manager') {
        return res.status(403).json({ error: 'Not permitted to update events' });
    }

    const event = await Event.findByPk(eventId);
    if (!event) {
        return res.status(404).json({ error: 'Event not found' });
    }

    const garden = await Garden.findByPk(event.GardenID);
    if (!garden || garden.ManagerID !== userId) {
        return res.status(403).json({ error: 'Not authorized to update this event' });
    }

    const { name, description, startDate, endDate, maxMembers, location, city} = req.body;
    event.Name = name || event.Name;
    event.Description = description || event.Description;
    event.StartDate = startDate ? new Date(startDate) : event.StartDate;
    event.EndDate = endDate ? new Date(endDate) : event.EndDate;
    event.MaxMembers = maxMembers || event.MaxMembers;
    event.Location = location || event.Location;
    event.city = city || event.city;
    
    await event.save();
    res.status(200).json({
        message: "Event updated successfully",
        Event: event
    });
}
export async function deleteEvent(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    
    const userId = req.user.id;
    const type = req.user.type;
    const { eventId } = req.params;
    
    if (type !== 'Manager') {
        return res.status(403).json({ error: 'Not permitted to delete events' });
    }

    const event = await Event.findByPk(eventId);
    if (!event) {
        return res.status(404).json({ error: 'Event not found' });
    }

    const garden = await Garden.findByPk(event.GardenID);
    if (!garden || garden.ManagerID !== userId) {
        return res.status(403).json({ error: 'Not authorized to delete this event' });
    }
    
    await event.destroy();
    res.status(200).json({ message: 'Event deleted successfully' });
}

export async function getAllEvents(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const currentDate = new Date();

        const events = await Event.findAll({
            order: [
                
                [Sequelize.literal(`StartDate >= '${currentDate.toISOString()}'`), 'DESC'],
                ['StartDate', 'ASC'] 
            ]
        });

        res.status(200).json(events);
    } catch (error) {
        console.error('Error retrieving all events:', error);
        res.status(500).json({ error: 'Failed to retrieve events' });
    }
}


export async function getEventById(req, res) {
    const { eventId } = req.params;

    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const event = await Event.findByPk(eventId);
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).json({ error: 'Event not found' });
        }
    } catch (error) {
        console.error('Error retrieving event:', error);
        res.status(500).json({ error: 'Failed to retrieve event' });
    }
}
export async function getEventsByGardenId(req, res) {
    const { gardenId } = req.params;
    
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const events = await Event.findAll({
            where: { GardenID: gardenId }
        });
        if (events.length > 0) {
            res.status(200).json(events);
        } else {
            res.status(404).json({ message: 'No events found for this garden' });
        }
    } catch (error) {
        console.error('Error retrieving events for garden:', error);
        res.status(500).json({ error: 'Failed to retrieve events for garden' });
    }
}

export async function searchEventsByCity(req, res) {
    const city = req.query.city;
    try {
        if (!city) {
            return res.status(400).json({ error: "City parameter is required for this search." });
        }

        const events = await Event.findAll({
            where: { city }
        });

        if (events.length > 0) {
            res.status(200).json(events);
        } else {
            res.status(404).json({ message: 'No events found for this city' });
        }
    } catch (error) {
        console.error('Error searching events by city:', error);
        res.status(500).json({ error: 'Failed to search events' });
    }
}


