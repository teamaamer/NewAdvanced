import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const Advice = sequelize.define('Advice', {
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: 
    {
        type: DataTypes.INTEGER,
    },
    title: 
    {
        type: DataTypes.STRING,
    },
    description: 
    {
        type: DataTypes.STRING,
    },
    content: 
    {
        type: DataTypes.TEXT,
    }
}, {
    timestamps: false
});

Advice.sync().then(() => {
    console.log('Advice model successfully.');
}).catch((error) => {
    console.error('Advice failed:', error);
});
export default Advice;