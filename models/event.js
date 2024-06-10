import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const Event = sequelize.define('Event', {
    EventParticipantID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    EventID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Event',
    timestamps: false
});

export default Event;
