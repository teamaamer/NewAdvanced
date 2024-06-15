// models/plot.js
import { DataTypes } from 'sequelize';
import sequelize from '../database';

const Plot = sequelize.define('Plot', {
  PlotID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  GardenID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  SoilType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Sunlight: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'Plots'
});

export default Plot;
