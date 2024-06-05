import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';
import User from './User'; // Import the User model

const Advice = sequelize.define('Advice', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    content: {
        type: DataTypes.TEXT,
    }
}, {
    timestamps: false
});

// Define the association
Advice.belongsTo(User, { foreignKey: 'userId' });

Advice.sync().then(() => {
    console.log('Advice model synchronized successfully.');
}).catch((error) => {
    console.error('Advice synchronization failed:', error);
});

export default Advice;