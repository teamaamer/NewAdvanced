import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';
import User from './userModel.js'; 


const Advice = sequelize.define('Advice', {
    AdviceID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Keyword: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    URL: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    AddedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'UserID'
        }
    },
    Date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Type: {
        type: DataTypes.ENUM('Advice', 'Tutorial'),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'advice'
});


Advice.belongsTo(User, { foreignKey: 'AddedBy' });

Advice.sync().then(() => {
    console.log('Advice model successfully.');
}).catch((error) => {
    console.error('Advice failed:', error);
});

export default Advice;