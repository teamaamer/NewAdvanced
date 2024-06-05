import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Garden = sequelize.define(
  "Garden",
  {
    GardenID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ManagerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
    },
    MaxMembers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "gardens",
    timestamps: false,
  }
);

Garden.sync()
  .then(() => console.log("Garden model synchronized with the database"))
  .catch((err) => console.error("Garden model synchronization failed:", err));

export default Garden;
