import Request from '../../models/sponcershipReqModel.js';
import Event from '../../models/eventModel.js';
import User from '../../models/userModel.js';


export async function requestSponsorship(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    const userId = req.user.id;
    const type= req.user.type;
    const { eventId} = req.params;
    const{organizationId, details, amount} = req.body;
    if(!organizationId || !details){
        return res.status(400).json({ error: 'Missing required fields details, organizationId' });
    }

    if (type !== 'Manager') {
        return res.status(403).json({ error: 'Only managers can request sponsorships' });
    }

    try {
        
        const event = await Event.findOne({
            where: {
                EventID: eventId,
                ManagerID: userId 
            }
        });

        if (!event) {
            return res.status(404).json({ error: 'Event not found or you are not the manager of this event' });
        }


        
        const organization = await User.findOne({
            where: {
                UserID: organizationId,
                Role: 'Organization'
            }
        });

        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }
        
        const newRequest = await Request.create({
            EventID: eventId,
            OrganizationID: organizationId,
            RequestDate: new Date(),
            Status: 'Pending',
            Details: details,
            AmountRequested : amount 
        });

        res.status(201).json({
            message: 'Sponsorship request created successfully',
            request: newRequest
        });
    } catch (error) {
        console.error('Failed to create sponsorship request:', error);
        res.status(500).json({ error: 'Failed to process sponsorship request' });
    }
}

export async function getAllSponsorshipRequestsForOrganization(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    const userId = req.user.id;
    const type = req.user.type;

    if (type !== 'Organization') {
        return res.status(403).json({ error: 'Only organizations can view sponsorship requests' });
    }

    try {
        const requests = await Request.findAll({
            where: { OrganizationID: userId }
        });

        res.status(200).json(requests);
    } catch (error) {
        console.error('Failed to retrieve sponsorship requests:', error);
        res.status(500).json({ error: 'Failed to retrieve sponsorship requests' });
    }
}

export async function getSponsorshipRequestById(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    const { requestId } = req.params;
    const userId = req.user.id;
    const type = req.user.type;

    if (type !== 'Organization') {
        return res.status(403).json({ error: 'Only organizations can view specific sponsorship requests' });
    }

    try {
        const request = await Request.findOne({
            where: {
                RequestID: requestId,
                OrganizationID: userId
            }
        });

        if (!request) {
            return res.status(404).json({ error: 'Sponsorship request not found or not accessible' });
        }

        res.status(200).json(request);
    } catch (error) {
        console.error('Failed to retrieve the sponsorship request:', error);
        res.status(500).json({ error: 'Failed to retrieve the sponsorship request' });
    }
}


export async function updateRequestStatus(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    const userId = req.user.id;
    const type = req.user.type;
    const { requestId } = req.params;
    const { status } = req.body;

    if (type !== 'Organization') {
        return res.status(403).json({ error: 'Only organizations can modify sponsorship requests' });
    }

    if (status !== 'Approved' && status !== 'Denied') {
        return res.status(400).json({ error: 'Invalid status. Must be "Approved" or "Denied".' });
    }
    

    try {
        const request = await Request.findOne({
            where: {
                RequestID: requestId,
                OrganizationID: userId
            }
        });

        if (!request) {
            return res.status(404).json({ error: 'Sponsorship request not found or not accessible' });
        }

        request.Status = status;
        request.ResponseDate = new Date(); 
        await request.save();

        if (status === 'Approved') {
            await updateEventSponsorship(request.EventID, request.OrganizationID);
        }

        res.status(200).json({
            message: `Sponsorship request ${status}.`,
            request: request
        });
    } catch (error) {
        console.error('Failed to update the sponsorship request:', error);
        res.status(500).json({ error: 'Failed to update the sponsorship request' });
    }
}


async function updateEventSponsorship(eventId, sponsorId) {
    try {
        const event = await Event.findByPk(eventId);
        if (event) {
            event.sponcerId = sponsorId;  
        }
        await event.save();
    } catch (error) {
        console.error('Error updating event with sponsor:', error);
        throw new Error('Error updating event sponsorship');
    }
}
