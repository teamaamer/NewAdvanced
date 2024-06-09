// controllers/plotController.js
import Plot from '../models/plot';

export const addPlot = async (req, res) => {
  try {
    const { GardenID, SoilType, Sunlight } = req.body;
    const newPlot = await Plot.create({ GardenID, SoilType, Sunlight });

    res.status(201).json(newPlot);
  } catch (error) {
    console.error('Error adding plot:', error);
    res.status(500).json({ error: 'Failed to add plot' });
  }
};

export const updatePlot = async (req, res) => {
  try {
    const { id } = req.params;
    const { GardenID, SoilType, Sunlight } = req.body;

    const plot = await Plot.findByPk(id);
    if (!plot) {
      return res.status(404).json({ error: 'Plot not found' });
    }

    await plot.update({ GardenID, SoilType, Sunlight });
    res.status(200).json(plot);
  } catch (error) {
    console.error('Error updating plot:', error);
    res.status(500).json({ error: 'Failed to update plot' });
  }
};

export const deletePlot = async (req, res) => {
  try {
    const { id } = req.params;
    const plot = await Plot.findByPk(id);
    if (!plot) {
      return res.status(404).json({ error: 'Plot not found' });
    }

    await plot.destroy();
    res.status(200).json({ message: 'Plot deleted successfully' });
  } catch (error) {
    console.error('Error deleting plot:', error);
    res.status(500).json({ error: 'Failed to delete plot' });
  }
};

export const getAllPlotsByGardenId = async (req, res) => {
  try {
    const { gardenId } = req.params;
    const plots = await Plot.findAll({ where: { GardenID: gardenId } });
    res.status(200).json(plots);
  } catch (error) {
    console.error('Error fetching plots:', error);
    res.status(500).json({ error: 'Failed to fetch plots' });
  }
};

export const getPlotById = async (req, res) => {
  try {
    const { id } = req.params;
    const plot = await Plot.findByPk(id);
    if (!plot) {
      return res.status(404).json({ error: 'Plot not found' });
    }

    res.status(200).json(plot);
  } catch (error) {
    console.error('Error fetching plot:', error);
    res.status(500).json({ error: 'Failed to fetch plot' });
  }
};
