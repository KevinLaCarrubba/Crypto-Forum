const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Crypto extends Model {}

Crypto.init(
    {
       id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true,
       },
        crypto_name: {
            type: DataTypes.STRING,
            allowNull: false,
       },
        category_id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           reference: {
            model: 'category',
            key: 'id'
           }
       }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'crypto',
    }
);

module.exports = Crypto;