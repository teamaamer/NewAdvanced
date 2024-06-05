import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const expert = sequelize.define('Expert', {
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
    expertise: {
        type: DataTypes.STRING,
        allowNull: false
    },
    organization: {
        type: DataTypes.STRING,
        allowNull: true
    },
    contactInfo: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true 
});

Expert.sync().then(() => {
    console.log('Expert model synchronized successfully.');
}).catch((error) => {
    console.error('Synchronization failed:', error);
});

export default expert;