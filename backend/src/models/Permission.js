const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Permission = sequelize.define('Permission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Permission',
});

module.exports = Permission;
