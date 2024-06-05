import express from "express";
import authMiddleware from "../middleware/auth.js";

import {
  addGarden,
  getAllGardens,
  getGardenById,
  updateGarden,
  deleteGarden,
} from "../controllers/gardenController.js";

import {
  addTask,
  getTasksByGardenId,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/TaskController.js";

import { joinGarden } from "../controllers/gardenMemebrCont.js";
import { assignTask, updateTaskStatus } from "../controllers/taskAssignment.js";

const gardenRouter = express.Router();

gardenRouter.post("/:gardenId/tasks", authMiddleware, addTask);
gardenRouter.get("/:gardenId/tasks", authMiddleware, getTasksByGardenId);
gardenRouter.get("/:gardenId/tasks/:taskId", authMiddleware, getTaskById);
gardenRouter.put("/:gardenId/tasks/:taskId", authMiddleware, updateTask);
gardenRouter.delete("/:gardenId/tasks/:taskId", authMiddleware, deleteTask);
gardenRouter.post("/:gardenId/join", authMiddleware, joinGarden);
gardenRouter.post(
  "/:gardenId/tasks/:taskId/assign",
  authMiddleware,
  assignTask
);
gardenRouter.put(
  "/:gardenId/tasks/:taskId/status",
  authMiddleware,
  updateTaskStatus
);

//gardens
gardenRouter.post("/", authMiddleware, addGarden);
gardenRouter.get("/", authMiddleware, getAllGardens);
gardenRouter.get("/:id", authMiddleware, getGardenById);
gardenRouter.put("/:id", authMiddleware, updateGarden);
gardenRouter.delete("/:id", authMiddleware, deleteGarden);

export default gardenRouter;
