// volunteerController.js
import volunteer from "../models/volunteer.js";

class volunteerc {
    static async createVolunteer(req, res) {
        try {
            const { name, email, skills } = req.body;

            const existingVolunteer = await Volunteer.findOne({ where: { email } });
            if (existingVolunteer) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            const volunteer = await Volunteer.create({
                name,
                email,
                skills
            });

            res.status(201).json({
                message: 'created successfully',
                volunteerId: volunteer.id
            });
        } catch (error) {
            console.error('Failed to create :', error);
            res.status(500).json({ error: 'Cannot create ', details: error.message });
        }
    }

    static async getAllVolunteers(req, res) {
        try {
            const volunteers = await Volunteer.findAll();
            res.status(200).json(volunteers);
        } catch (error) {
            console.error('Failed to fetch volunteers:', error);
            res.status(500).json({ error: 'Cannot fetch volunteers', details: error.message });
        }
    }
}

export default volunteercon;