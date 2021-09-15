const { Model, DataTypes } = require('sequelize');
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
        crypto_id: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'crypto',
                key: 'id'
            }
        },
        tag_id: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'tag',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'crypto_tag',
    }
);

module.exports = CryptoTag;