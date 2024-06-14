import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const EventParticipant = sequelize.define('EventParticipant', {
    EventParticipantID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    EventID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    UserName:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'EventParticipants', 
    timestamps: false 
});

EventParticipant.sync()
  .then(() => console.log('EventParticipant model synchronized with the database'))
  .catch((err) => console.error('EventParticipant model synchronization failed:', err));

export default EventParticipant;
