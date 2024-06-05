import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Task = sequelize.define(
  "Task",
  {
    TaskID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    GardenID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    AssignedTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Status: {
      type: DataTypes.ENUM(
        "notAssigned",
        "Assigned",
        "InProgress",
        "Completed"
      ),
      allowNull: false,
    },
    plotId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    completedAT: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

Task.sync()
  .then(() => console.log("Task model synchronized with the database"))
  .catch((err) => console.error("Task model synchronization failed:", err));

export default Task;
