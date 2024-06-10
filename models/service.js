import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

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

export default Service;
