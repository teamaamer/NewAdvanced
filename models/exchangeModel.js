import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const MaterialExchange = sequelize.define(
  "MaterialExchange",
  {
    ExchangeID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    OfferedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Time: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Status: {
      type: DataTypes.ENUM("Open", "Closed"),
      allowNull: false,
    },
    ReceiverID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    keyword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: String,
      enum: ["offer", "request"],
      required: true,
    },
    postedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "materialexchange",
    timestamps: false,
  }
);

MaterialExchange.sync()
  .then(() =>
    console.log("MaterialExchange model synchronized with the database")
  )
  .catch((err) =>
    console.error("MaterialExchange model synchronization failed:", err)
  );

export default MaterialExchange;
