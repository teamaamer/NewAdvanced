import GardenMember from "../../models/gardenMember.js";
import Garden from "../../models/gardenModel.js";

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
