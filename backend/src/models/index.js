const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('./config/database');

const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const UserRole = require('./UserRole');
const RolePermission = require('./RolePermission');


User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' });

Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'roleId' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permissionId' });

const db = {
    sequelize,
    Sequelize,
    User,
    Role,
    Permission,
    UserRole,
    RolePermission
};

module.exports = db;