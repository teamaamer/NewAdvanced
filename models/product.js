import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';


const Product = sequelize.define('Product', {
    ProductID: {
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
    tableName: 'products',
    timestamps: false
});

export default Product;