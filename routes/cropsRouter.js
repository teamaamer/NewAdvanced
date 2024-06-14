import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  addCrop,
  deleteCrop,
  updateCrop,
  getCropsByPlotId,
  getAllCrops,
  getCropById,
} from "../controllers/cropsController.js";

const crop = express.Router();

crop.post("/", authMiddleware, addCrop);
crop.delete("/:id", authMiddleware, deleteCrop);
crop.put("/:id", authMiddleware, updateCrop);
crop.get("/plot/:plotId", authMiddleware, getCropsByPlotId);
crop.get("/", authMiddleware, getAllCrops);
crop.get("/:id", authMiddleware, getCropById);

export default crop;
