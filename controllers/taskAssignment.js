import Task from "../models/taskModel.js";
import Garden from "../models/gardenModel.js";
import GardenMember from "../models/gardenMember.js";

export async function assignTask(req, res) {
    try {
        const managerId = req.user.id; 
        const { gardenId, taskId } = req.params;
        const { gardenMemId } = req.body;  

        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const garden = await Garden.findByPk(gardenId);
        if (!garden) {
            return res.status(404).json({ error: 'Garden not found' });
        }

        if (managerId !== garden.ManagerID) {
            return res.status(403).json({ error: 'Only the garden manager can assign tasks' });
        }
        
        if (task.AssignedTo) {
            return res.status(400).json({ error: 'Task is already assigned' });
        }

        if (!gardenMemId) {
            return res.status(400).json({ error: 'Garden member id is required' });
        }

        const gardenMember = await GardenMember.findOne({
            where: {
                UserID: gardenMemId,
                GardenID: gardenId
            }
        });

        if (!gardenMember) {
            return res.status(404).json({ error: 'Garden member not found or not part of this garden' });
        }

        task.AssignedTo = gardenMemId;
        task.Status = 'Assigned';
        await task.save();

        res.status(200).json({ message: 'Task assigned successfully', task });
    } catch (error) {
        console.error('Failed to assign task:', error);
        res.status(500).json({ error: 'Cannot assign task', details: error.message });
    }
};

export async function updateTaskStatus(req, res) {
    try {
        const userId = req.user.id;
        const { gardenId, taskId } = req.params;
        const { status } = req.body;

        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (task.GardenID !== parseInt(gardenId)) {
            return res.status(400).json({ error: 'Task does not belong to the specified garden' });
        }

        const garden = await Garden.findByPk(gardenId);
        if (!garden) {
            return res.status(404).json({ error: 'Garden not found' });
        }

        if (userId !== garden.ManagerID && userId !== task.AssignedTo) {
            return res.status(403).json({ error: 'Not authorized to update this task' });
        }

        if (!isValidStatusTransition(task.Status, status)) {
            return res.status(400).json({ error: 'Invalid status transition' });
        }

        
        if (status === 'InProgress' && task.Status === 'Assigned') {
            task.startedAt = new Date();
        } else if (status === 'Completed' && task.Status === 'InProgress') {
            task.completedAT = new Date();
        }

        
        task.Status = status;

        await task.save();
        res.status(200).json({ message: 'Task status updated successfully', task });
    } catch (error) {
        console.error('Failed to update task status:', error);
        res.status(500).json({ error: 'Cannot update task status', details: error.message });
    }
}

/**
 * Check if the transition between the old status and new status is valid.
 * @param {string} oldStatus - The current status of the task.
 * @param {string} newStatus - The desired status to transition to.
 * @returns {boolean} - True if the transition is valid, false otherwise.
 */
function isValidStatusTransition(oldStatus, newStatus) {
    const validTransitions = {
        'Assigned': ['InProgress'],
        'InProgress': ['Completed']
    };
    return validTransitions[oldStatus] && validTransitions[oldStatus].includes(newStatus);
}
