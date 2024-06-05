import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Guide = sequelize.define('Guide', {
  GuideID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Auther: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Keyword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  AddedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, // Disable timestamps for manual control
});

Guide.sync()
.then(() => console.log('Task model synchronized with the database'))
.catch((err) => console.error('Task model synchronization failed:', err));


export default Guide;
