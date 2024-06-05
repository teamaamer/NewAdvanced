import Advice from "../models/advice.js";

class AdviceController {
    static async createAdvice(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'User not authenticated' });
            }
            const userId = req.user.id;
            const { title, description, content } = req.body;

            const advice = await Advice.create({
                userId,
                title,
                description,
                content
            });

            res.status(200).json({
                message: 'Advice created successfully',
                adviceId: advice.id
            });

        } catch (error) {
            console.error('Failed to create advice:', error);
            res.status(500).json({ error: 'Cannot create advice', details: error.message });
        }
    }
}

export default AdviceController;