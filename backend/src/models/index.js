// const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

// const User = require('./User');
// const Role = require('./Role');
// const Permission = require('./Permission');
// const UserRole = require('./UserRole');
// const RolePermission = require('./RolePermission');


// User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId', otherKey: 'roleId' });
// Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId', otherKey: 'userId' });

// Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'roleId', as: 'permissions' });
// Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permissionId', as: 'roles' });

// const user = await User.findByPk(1, { include: 'roles' });
// const role = await Role.findByPk(1, { include: 'permissions' });

// const db = {
//     sequelize,
//     Sequelize,
//     User,
//     Role,
//     Permission,
//     UserRole,
//     RolePermission
// };

module.exports = {
    sequelize,
    User,
    // Role, // Uncomment if you still use Role model
    // Permission // Uncomment if you still use Permission model
};