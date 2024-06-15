import Crop from "../models/cropModel.js";
import { Sequelize } from "sequelize";

export async function addCrop(req, res) {
  try {
    const crop = await Crop.create(req.body);
    res.status(201).send(crop);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export async function deleteCrop(req, res) {
  try {
    const id = req.params.id;
    const num = await Crop.destroy({ where: { CropID: id } });
    if (num == 1) {
      res.status(204).send({ message: "Crop was deleted successfully!" });
    } else {
      res.send({
        message: `Cannot delete Crop with id=${id}. Maybe Crop was not found!`,
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export async function updateCrop(req, res) {
  try {
    const id = req.params.id;
    const num = await Crop.update(req.body, { where: { CropID: id } });
    if (num == 1) {
      res.send({ message: "Crop was updated successfully." });
    } else {
      res.send({
        message: `Cannot update Crop with id=${id}. Maybe Crop was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export async function getCropsByPlotId(req, res) {
  try {
    const plotId = req.params.plotId;
    const crops = await Crop.findAll({ where: { PlotID: plotId } });
    res.send(crops);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export async function getAllCrops(req, res) {
  try {
    const crops = await Crop.findAll();
    res.send(crops);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export async function getCropById(req, res) {
  try {
    const id = req.params.id;
    const crop = await Crop.findByPk(id);
    if (crop) {
      res.send(crop);
    } else {
      res.status(404).send({ message: `Crop with id=${id} not found.` });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
