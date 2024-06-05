// volunteer.js
import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const volunteer = sequelize.define('Volunteer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    skills: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});

Volunteer.sync().then(() => {
    console.log('Volunteer model synchronized successfully.');
}).catch((error) => {
    console.error('Synchronization failed:', error);
});

export default volunteer;
