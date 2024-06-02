
import Garden from '../models/gardenModel.js';
import Task from '../models/taskModel.js';
import GardenMember from "../models/gardenMember.js";

export async function addTask(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const userId = req.user.id; 
        const { gardenId } = req.params;

        
        const garden = await Garden.findByPk(gardenId);
        if (!garden) {
            return res.status(404).json({ error: 'Garden not found' });
        }

        if (garden.ManagerID !== userId) {
            return res.status(403).json({ error: 'You are not authorized to add tasks to this garden' });
        }

        const { description, plotId } = req.body;
        if (!description) {
            return res.status(400).json({ error: 'Task description must be provided' });
        }

        // Create a new task
        const newTask = await Task.create({
            Description: description,
            GardenID: gardenId,
            AssignedTo: null, 
            Status: 'notAssigned',
            plotId: plotId,
            createdAt: new Date()
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error('Failed to add task:', error);
        res.status(500).json({ error: 'Cannot add garden task', details: error.message });
    }
};

export async function getTasksByGardenId(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const userId = req.user.id;
        const { gardenId } = req.params;

        const garden = await Garden.findByPk(gardenId);
        if (!garden) {
            return res.status(404).json({ error: 'Garden not found' });
        }
        
        const isMember = await GardenMember.findOne({
            where: {
                GardenID: gardenId,
                UserID: userId
            }
        });
        
        if (!isMember && garden.ManagerID !== userId) {
            return res.status(403).json({ error: 'You are not authorized to view tasks in this garden' });
        }

        const tasks = await Task.findAll({
            where: { GardenID: gardenId }
        });
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Failed to get tasks:', error);
        res.status(500).json({ error: 'Cannot get garden tasks', details: error.message });
    }
};

export async function getTaskById(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const userId = req.user.id;
        const { gardenId, taskId } = req.params;

        const garden = await Garden.findByPk(gardenId);
        if (!garden) {
            return res.status(404).json({ error: 'Garden not found' });
        }

        const isMember = await GardenMember.findOne({
            where: {
                GardenID: gardenId,
                UserID: userId
            }
        });
        
        if (!isMember && garden.ManagerID !== userId) {
            return res.status(403).json({ error: 'You are not authorized to view this task' });
        }

        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error('Failed to get task:', error);
        res.status(500).json({ error: 'Cannot get garden task', details: error.message });
    }
};

export async function updateTask(req, res) {
    try{
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const userId = req.user.id;
        const { gardenId, taskId } = req.params;
        const garden = await Garden.findByPk(gardenId);
        if (!garden) {
            return res.status(404).json({ error: 'Garden not found' });
        }
        if (garden.ManagerID!== userId) {
            return res.status(403).json({ error: 'You are not authorized to update task description in this garden' });
        }
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        const {description, plotId} = req.body;
        if (!description) {
            return res.status(400).json({ error: 'Task description must be provided' });
        }
        const updatedTask = await task.update({
            Description: description,
            plotId: plotId
        });
        res.status(200).json(updatedTask);
    }
    catch (error) {
        console.error('Failed to update task:', error);
        res.status(500).json({ error: 'Cannot update garden task', details: error.message });
    }
};

export async function deleteTask(req, res) {
    try{
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const userId = req.user.id;
        const { gardenId, taskId } = req.params;
        const garden = await Garden.findByPk(gardenId);
        if (!garden) {
            return res.status(404).json({ error: 'Garden not found' });
        }
        if (garden.ManagerID!== userId) {
            return res.status(403).json({ error: 'You are not authorized to delete tasks in this garden' });
        }
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await task.destroy();
        res.status(204).json("deleted successfully");
    }
    catch (error) {
        console.error('Failed to delete task:', error);
        res.status(500).json({ error: 'Cannot delete garden task', details: error.message });
    }

};
