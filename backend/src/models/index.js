const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const Karyawan = require('./Karyawan');
const Pelanggan = require('./Pelanggan');


User.belongsToMany(Role, { through: 'UserRole', foreignKey: 'userId', otherKey: 'roleId' });
Role.belongsToMany(User, { through: 'UserRole', foreignKey: 'roleId', otherKey: 'userId' });

Role.belongsToMany(Permission, { through: 'RolePermission', foreignKey: 'roleId', otherKey: 'permissionId' });
Permission.belongsToMany(Role, { through: 'RolePermission', foreignKey: 'permissionId', otherKey: 'roleId' });

Karyawan.hasOne(User, { foreignKey: 'entity_id', constraints: false, scope: { type: 'karyawan' } });
User.belongsTo(Karyawan, { foreignKey: 'entity_id', constraints: false });

User.hasOne(Karyawan, { foreignKey: 'user_id' });
Karyawan.belongsTo(User, { foreignKey: 'user_id' });

Pelanggan.hasOne(User, { foreignKey: 'entity_id', constraints: false, scope: { type: 'pelanggan' } });
User.belongsTo(Pelanggan, { foreignKey: 'entity_id', constraints: false });

User.hasOne(Pelanggan, { foreignKey: 'user_id' });
Pelanggan.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
    Role,
    User,
    Permission,
    Karyawan,
    Pelanggan,
    
    sequelize: request('.config/database')
}