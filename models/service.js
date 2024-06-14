import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';
import User from './userModel.js';
import db from '../db.js'; 

const Service = sequelize.define('Service', {
    ServiceID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    ProviderName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    AddedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'UserID'
        }
    }
}, {
    tableName: 'services',
    timestamps: false
});

Service.belongsTo(User, { foreignKey: 'AddedBy' });

Service.sync().then(() => {
    console.log('Service model synced successfully.');
}).catch((error) => {
    console.error('Service model sync failed:', error);
});

export default Service;