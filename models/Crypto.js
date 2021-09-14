const { Models, DataTypes } = require('sequelize');
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
    }
)