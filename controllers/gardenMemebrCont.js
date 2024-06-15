import GardenMember from "../models/gardenMember.js";
import Garden from "../models/gardenModel.js";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
export async function joinGarden(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const userId = req.user.id;
        const userType = req.user.type;
        const { gardenId } = req.params;

        if (userType !== 'Volunteer') {
            return res.status(401).json({ error: 'Only volunteers are permitted to join the garden' });
        }

        const garden = await Garden.findByPk(gardenId);
        if (!garden) {
            return res.status(404).json({ error: 'Garden not found' });
        }

        const gardenMember = await GardenMember.findOne({
            where: {
                GardenID: gardenId,
                UserID: userId
            }
        });
        if (gardenMember) {
            return res.status(400).json({ error: 'Already a member of this garden' });
        }

        const currentMemberCount = await GardenMember.count({
            where: { GardenID: gardenId }
        });
        if (currentMemberCount >= garden.MaxMembers) {
            return res.status(400).json({ error: 'Garden has reached maximum members limit' });
        }

        const member = await GardenMember.create({
            GardenID: gardenId,
            UserID: userId
        });

        res.status(200).json({
            message: 'Successfully joined the garden',
            memberId: member.GardenMemberID,
            gardenId: member.GardenID
        });

    } catch (error) {
        console.error('Failed to join garden:', error);
        res.status(500).json({ error: 'Cannot join garden', details: error.message });
    }
}

export async function getAllTasksForGardenMember(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    const userId = req.user.id;
    const { gardenId } = req.params;


    try {
        const garden = await Garden.findByPk(gardenId);
        if (!garden) {
            return res.status(404).json({ error: 'Garden not found' });
        }
        const gardenMember = await GardenMember.findOne({
            where: {
                GardenID: gardenId,
                UserID: userId
            }
        });
        if (!gardenMember) {
            return res.status(404).json({ error: 'Garden member not found or not part of this garden' });
        }
        const tasks = await Task.findAll({
            where: {
                GardenID: gardenId,
                AssignedTo: userId
            }
        });

        if (tasks.length === 0) {
            return res.status(404).json({ error: 'No tasks found for this garden member' });
        }

        res.status(200).json(tasks);
    } catch (error) {
        console.error('Failed to fetch tasks for garden member:', error);
        res.status(500).json({ error: 'Failed to fetch tasks', details: error.message });
    }
}

export async function getAllGardenMembers(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    const userId = req.user.id;
    const { gardenId } = req.params;

    try {
        const garden = await Garden.findByPk(gardenId);
        if (!garden) {
            return res.status(404).json({ error: 'Garden not found' });
        }
        
        const gardenMembers = await GardenMember.findAll({
            where: {
                GardenID: gardenId,
            },
            include: [{
                model: User, 
                attributes: ['Username'] }]
        });

        if (gardenMembers.length === 0) {
            return res.status(404).json({ error: 'No members found in this garden' });
        }

        res.status(200).json(gardenMembers);
    } catch (error) {
        console.error('Failed to fetch garden members:', error);
        res.status(500).json({ error: 'Failed to fetch garden members', details: error.message });
    }
}

