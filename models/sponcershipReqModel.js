import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Request = sequelize.define('Request', {
    RequestID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    EventID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    OrganizationID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    RequestDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    Status: {
        type: DataTypes.ENUM('Pending', 'Approved', 'Denied'),
        allowNull: false,
    },
    AmountRequested: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    ResponseDate: {
        type: DataTypes.DATEONLY,
        allowNull: true, 
    },
    Details: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'sponsorship_requests', 
    timestamps: false 
});
Request.sync()
  .then(() => console.log('Request model synchronized with the database'))
  .catch((err) => console.error('Request model synchronization failed:', err));

export default Request;
