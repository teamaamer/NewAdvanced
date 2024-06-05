import expert from "../models/expert.js";

class expertcon
 {
    static async createExpert(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'User not authenticated' });
            }
            const { name, expertise, organization, contactInfo } = req.body;

            const expert = await expert.create({
                name,
                expertise,
                organization,
                contactInfo
            });

            res.status(200).json({
                message: 'Expert created successfully',
                expertId: expert.id
            });

        } catch (error) {
            console.error('Failed to create expert:', error);
            res.status(500).json({ error: 'Cannot create expert', details: error.message });
        }
    }
}

export default expertcon;