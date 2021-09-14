const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Catergory extends Model {}

Catergory.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
    }
)