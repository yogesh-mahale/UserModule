const { sequelize } = require('../../../common/dbUtils');
const { DataTypes } = require('sequelize');

const RoleModel = require('../../Role/models/RoleModel');
const BusinessModel = require('../models/BusinessModel');

const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING(255),
        field: 'firstName',
    },
    lastName: {
        type: DataTypes.STRING(255),
        field: 'lastName',
    },
    email: {
        type: DataTypes.STRING(255),
        field: 'email',
    },
    password: {
        type: DataTypes.STRING(255),
        field: 'password',
    },
    token: {
        type: DataTypes.STRING(255),
        field: 'token',
    },
    mobileNo: {
        type: DataTypes.STRING(255),
        field: 'mobileNo',
    },
    address: {
        type: DataTypes.TEXT,
        field: 'address',
    },
    country: {
        type: DataTypes.STRING(60),
        field: 'country',
    },
    isActive: {
        type: DataTypes.SMALLINT,
        field: 'isActive',
    },
    lastLoginAt: {
        type: DataTypes.DATE,
        field: 'lastLoginAt'
    },
    tokenValidUpto: {
        type: DataTypes.DATE,
        field: 'tokenValidUpto'
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
    },
    roleId: {
        type: DataTypes.INTEGER,
        field: 'roleId',
    },
    businessId: {
        type: DataTypes.INTEGER,
        field: 'businessId',
    },
},
{
    tableName: 'users',
    freezeTableName: true,
});

UserModel.belongsTo(RoleModel, {as: 'Role', foreignKey: 'roleId', onDelete: 'SET NULL'});
UserModel.belongsTo(BusinessModel, {as: 'Business', foreignKey: 'businessId', onDelete: 'SET NULL'});

module.exports = UserModel;