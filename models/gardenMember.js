import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const GardenMember = sequelize.define(
  "GardenMember",
  {
    GardenMemberID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    GardenID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

GardenMember.sync()
  .then(() => {
    console.log("GardenMember model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Synchronization failed:", error);
  });

export default GardenMember;
