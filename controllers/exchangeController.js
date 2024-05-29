
import MaterialExchange from '../models/exchangeModel.js';

export const addMaterialExchange = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const userId = req.user.id;

        const { description, location, city, time, keyword, type } = req.body;
        if (!description || !location || !city || !time || !keyword || !type) {
            return res.status(400).json({ error: 'All required fields must be provided' });
        }
        if (type !== 'offer' && type !== 'request') {
            return res.status(400).json({ error: 'Invalid type specified' });
        }

        const materialExchangeData = {
            Description: description,
            Location: location,
            City: city,
            Time: time,
            Status: "Open",
            keyword: keyword,
            Type: type
        };

        if (type === 'offer') {
            materialExchangeData.OfferedBy = userId;
        } else if (type === 'request') {
            materialExchangeData.ReceivedBy = userId;
        }
        const newMaterialExchange = await MaterialExchange.create(materialExchangeData);
        res.status(201).json(newMaterialExchange);

    } catch (error) {
        console.error('Failed to add material exchange:', error);
        res.status(500).json({ error: 'Failed to add material exchange' });
    }
};



export const getAllMaterial = async (req, res) => {
    try{
        if(!req.user){
            return res.status(401).json({ error: 'User not authenticated' });
       }
       const materialExchanges = await MaterialExchange.findAll({ });

       res.status(200).json(materialExchanges);

    }catch (error) {
    console.error('Failed to get material exchange:', error);
    res.status(500).json({ error: 'Failed to get material exchange' });
}
};


export const getMaterialById = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        
        const materialId = req.params.id;
        if (!materialId) {
            return res.status(400).json({ error: 'Material ID must be provided' });
        }

        const materialExchange = await MaterialExchange.findOne({
            where: { ExchangeID: materialId }
        });

        if (!materialExchange) {
            return res.status(404).json({ error: 'Material not found' });
        }

        res.status(200).json(materialExchange);

    } catch (error) {
        console.error('Failed to get material exchange:', error);
        res.status(500).json({ error: 'Failed to get material exchange' });
    }
};

export const acceptMaterialRequest = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const userId = req.user.id;
        const materialId = req.params.id;

        const materialExchange = await MaterialExchange.findOne({
            where: {
                ExchangeID: materialId,
                Status: 'Open'
            }
        });
        if (!materialExchange) {
            return res.status(404).json({ error: 'Material request not found or already closed' });
        }

        const updateData = { Status: 'Closed' };
        if (materialExchange.Type === 'request') {
            updateData.OfferedBy = userId;  
        } else if (materialExchange.Type === 'offer') {
            updateData.ReceivedBy = userId; 
        }

        await materialExchange.update(updateData);
        
        res.status(200).json({
            message: 'Material request accepted',
            materialExchange
        });

    } catch (error) {
        console.error('Failed to accept material exchange:', error);
        res.status(500).json({ error: 'Failed to accept material exchange' });
    }
};


export const deleteMaterialExchange = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const materialId = req.params.id;

        const materialExchange = await MaterialExchange.findOne({
            where: {
                ExchangeID: materialId,
                Status: 'Open'
            }
        });

        if (!materialExchange) {
            return res.status(404).json({ error: 'Material exchange not found or already closed' });
        }

        await materialExchange.destroy();
        res.status(200).json({
            message: 'Material exchange deleted successfully'
        });

    } catch (error) {
        console.error('Failed to delete material exchange:', error);
        res.status(500).json({ error: 'Failed to delete material exchange' });
    }
};

export const updateMaterialExchange = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const materialId = req.params.id; 
        const { description, location, city, time, keyword } = req.body; 

        const materialExchange = await MaterialExchange.findByPk(materialId);

        if (!materialExchange) {
            return res.status(404).json({ error: 'Material exchange not found' });
        }

        if (materialExchange.Status !== 'Open') {
            return res.status(400).json({ error: 'Material exchange cannot be updated as it is not open' });
        }

        materialExchange.Description = description || materialExchange.Description;
        materialExchange.Location = location || materialExchange.Location;
        materialExchange.City = city || materialExchange.City;
        materialExchange.Time = time || materialExchange.Time;
        materialExchange.Keyword = keyword || materialExchange.Keyword;

        await materialExchange.save();

        res.status(200).json({
            message: 'Material exchange updated successfully',
            materialExchange
        });

    } catch (error) {
        console.error('Failed to update material exchange:', error);
        res.status(500).json({ error: 'Failed to update material exchange' });
    }
};

export const searchByType = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const { type } = req.query;
        if (!type) {
            return res.status(400).json({ error: 'Type parameter is required' });
        }

        const results = await MaterialExchange.findAll({
            where: {
                type: type,
            }
        });

        res.status(200).json(results);
    } catch (error) {
        console.error('Failed to search material exchanges by type:', error);
        res.status(500).json({ error: 'Failed to search by type' });
    }
};

export const searchByKeyword = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const { keyword } = req.query;
        if (!keyword) {
            return res.status(400).json({ error: 'Type parameter is required' });
        }

        const results = await MaterialExchange.findAll({
            keyword: keyword,
            Status: 'Open'
        });

        res.status(200).json(results);
    } catch (error) {
        console.error('Failed to search material exchanges by type:', error);
        res.status(500).json({ error: 'Failed to search by type' });
    }
};

export const searchByStatus = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const { Status } = req.query;
        if (!Status) {
            return res.status(400).json({ error: 'Type parameter is required' });
        }

        const results = await MaterialExchange.find({
            Status: Status,
        });

        res.status(200).json(results);
    } catch (error) {
        console.error('Failed to search material exchanges by type:', error);
        res.status(500).json({ error: 'Failed to search by type' });
    }
};