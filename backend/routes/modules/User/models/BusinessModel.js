const { sequelize } = require('../../../common/dbUtils');
const { DataTypes } = require('sequelize');

const BusinessModel = sequelize.define('Business', {
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        field: 'name',
    },
    domain: {
        type: DataTypes.STRING(255),
        field: 'domain',
    },
    phone: {
        type: DataTypes.STRING(255),
        field: 'phone',
    },
    isActive: {
        type: DataTypes.SMALLINT,
        field: 'isActive',
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'createdAt'
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedAt'
    },
    createdBy: {
        type: DataTypes.INTEGER,
        field: 'createdBy',
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        field: 'updatedBy',
    }
},
{
    tableName: 'business',
    freezeTableName: true,
});

module.exports = BusinessModel;