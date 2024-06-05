import Tutorials from "../models/tutorials.js";

class TutorialController {
    static async createTutorial(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'User not authenticated' });
            }
            const userId = req.user.id;
            const { description, url } = req.body;

            const tutorial = await Tutorials.create({
                userId,
                description,
                url
            });

            res.status(200).json({
                message: 'Tutorial created successfully',
                tutorialId: tutorial.id
            });

        } catch (error) {
            console.error('Failed to create tutorial:', error);
            res.status(500).json({ error: 'Cannot create tutorial', details: error.message });
        }
    }
}

export default TutorialController;