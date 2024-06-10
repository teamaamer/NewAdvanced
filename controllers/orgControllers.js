import User from '../models/userModel.js';

export async function getAllOrganizations(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    try {
        const organizations = await User.findAll({
            where: {
                Role: 'Organization'
            },
            attributes: ['UserID', 'Username', 'Email', 'ProfileInfo', 'ProfilePic']
        });

        if (organizations.length > 0) {
            res.status(200).json(organizations);
        } else {
            res.status(404).json({ message: 'No organizations found' });
        }
    } catch (error) {
        console.error('Error retrieving organizations:', error);
        res.status(500).json({ error: 'Failed to retrieve organizations' });
    }
}
export async function getOrganizationById(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    const { organizationId } = req.params;

    try {
        const organization = await User.findOne({
            where: {
                UserID: organizationId,
                Role: 'Organization'
            },
            attributes: ['UserID', 'Username', 'Email', 'ProfileInfo', 'ProfilePic']
        });

        if (organization) {
            res.status(200).json(organization);
        } else {
            res.status(404).json({ message: 'Organization not found' });
        }
    } catch (error) {
        console.error('Error retrieving organization:', error);
        res.status(500).json({ error: 'Failed to retrieve organization' });
    }
};

export async function searchOrganizationByName(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    const { name } = req.query;

    try {
        if (!name) {
            return res.status(400).json({ error: "Name query parameter is required" });
        }

        const organizations = await User.findAll({
            where: {
                Role: 'Organization',
                Username: name,
            },
            attributes: ['UserID', 'Username', 'Email', 'ProfileInfo', 'ProfilePic']
        });

        if (organizations.length > 0) {
            res.status(200).json(organizations);
        } else {
            res.status(404).json({ message: 'No organizations found matching the provided name' });
        }
    } catch (error) {
        console.error('Error searching organizations:', error);
        res.status(500).json({ error: 'Failed to search organizations' });
    }
};

