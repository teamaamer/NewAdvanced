import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Crop = sequelize.define(
  "Crop",
  {
    CropID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    PlotID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PlantingDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    HarvestDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "crops",
    timestamps: false,
  }
);

Crop.sync()
  .then(() => console.log("Crop model synchronized with the database"))
  .catch((err) => console.error("Crop model synchronization failed:", err));

export default Crop;
