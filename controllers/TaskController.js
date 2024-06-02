import express from 'express';
import Garden from '../models/gardenModel.js';  // Adjust path as necessary
import Task from '../models/taskModel.js';

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
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

};