import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';
import User from './User'; // Import the User model

const Tutorials = sequelize.define('Tutorials', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.TEXT,
    },
    url: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false
});

// Define the association
Tutorials.belongsTo(User, { foreignKey: 'userId' });

Tutorials.sync().then(() => {
    console.log('Tutorials model synchronized successfully.');
}).catch((error) => {
    console.error('Tutorials synchronization failed:', error);
});

export default Tutorials;