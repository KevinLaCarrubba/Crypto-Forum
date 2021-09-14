const { Models, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CryptoTag extends Model {}

CryptoTag.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
    }
)