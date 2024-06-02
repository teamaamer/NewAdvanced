import Garden from '../models/gardenModel.js';

export async function addGarden(req,res){
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const userId = req.user.id;
        const type=req.user.type;

        if(type!="Manager"){
            return res.status(401).json({ error: 'Not permitted to add garden' });
        }
        const { gardenName, description, location, gardenCity, maxMemebrs} = req.body;

        if (!gardenName ||!description ||!location ||!gardenCity ||!maxMemebrs) {
            return res.status(400).json({ error: 'All required fields must be provided' });
        }
        
        const existingGarden = await Garden.findOne({ where: {Name : gardenName} });

        if (existingGarden) {
            return res.status(400).json({ error: 'Garden already exists' });
        }

        const garden = await Garden.create({
            Name: gardenName,
            ManagerID: userId,
            Location: location,
            City: gardenCity,
            Description: description,
            MaxMembers: maxMemebrs

        });
        res.status(200).json({
            GardenID: garden.GardenID,
            Name: garden.Name
          });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'User login failed' });
      }
};