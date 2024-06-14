import { DataTypes } from 'sequelize';
const sequelize = require('../db.js');  
import connectDB from '../../db.js'; 

connectDB();
const EventP = sequelize.define('EventP', {
    EventPID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    EventID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Event,
            key: 'EventID'
        }
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'UserID'
        }
    },
    UserName:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'event',
    timestamps: false
});

EventP.belongsTo(Event, { foreignKey: 'EventID' });
EventP.belongsTo(User, { foreignKey: 'UserID' });

EventP.sync().then(() => {
    console.log('EventP model synced successfully.');
}).catch((error) => {
    console.error('EventP model sync failed:', error);
});
export default EventP;