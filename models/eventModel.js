import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Event = sequelize.define('Event', {
EventID:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
}, 
Name:{
type: DataTypes.STRING,
allowNull: false
},
Description:{
    type: DataTypes.TEXT,
    allowNull: false
},
GardenID:{
type: DataTypes.INTEGER,
allowNull: true
},
sponcerId:{
    type: DataTypes.INTEGER,
    allowNull: true
},
StartDate:{
    type: DataTypes.DATE,
    allowNull: false
},
EndDate:{
    type: DataTypes.DATE,
    allowNull: false
},
MaxMembers:{
    type: DataTypes.INTEGER,
    allowNull: false
},
Location:{
    type: DataTypes.TEXT,
    allowNull: false
},
city:{
    type: DataTypes.STRING,
allowNull: false
},
ManagerID: { 
    type: DataTypes.INTEGER,
    allowNull: false
}
}, {
    timestamps: false 
});


Event.sync()
  .then(() => console.log('Event model synchronized with the database'))
  .catch((err) => console.error('Event model synchronization failed:', err));

export default Event;