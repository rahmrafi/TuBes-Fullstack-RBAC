const { User, Role, UserRole } = require('../models');


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Role, through: { attributes: [] } }]
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data user', error });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.create({ username, password, email });
    res.status(201).json({ message: 'User berhasil dibuat', user });
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat user', error });
  }
};

exports.assignRoleToUser = async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) {
      return res.status(404).json({ message: 'User atau Role tidak ditemukan' });
    }

    await user.addRole(role);

    res.status(200).json({ message: `Role '${role.name}' ditambahkan ke user '${user.username}'` });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan role ke user', error });
  }
};

exports.getUserRoles = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId, {
      include: [{ model: Role, through: { attributes: [] } }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    res.status(200).json({ roles: user.Roles });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil role user', error });
  }
};

exports.countUser = async (req, res) => {
  try {
    const count = await User.count();
    res.status(200).json({ totalUsers: count});
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghitung user', error});
  }
};