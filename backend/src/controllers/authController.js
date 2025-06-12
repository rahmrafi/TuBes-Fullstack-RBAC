// backend/src/controllers/authController.js
const { User } = require('../models'); // Hanya butuh model User
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Pastikan ini diimport
const { Op } = require('sequelize'); // Untuk pencarian OR (username ATAU email)

// --- Fungsi Registrasi ---
const register = async (req, res) => {
    // Menerima username (dari 'nama' di frontend), email, password, dan role (dari select di frontend)
    const { username, email, password, role } = req.body;

    try {
        // 1. Validasi Input (Dasar)
        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: 'Nama pengguna, email, password, dan role wajib diisi.' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password harus minimal 6 karakter.' });
        }
        if (!['admin', 'user'].includes(role)) { // Batasi role yang bisa diregistrasi via UI
            return res.status(400).json({ message: 'Role tidak valid. Pilih antara "admin" atau "user".' });
        }

        // 2. Cek Duplikasi Email atau Username
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { username: username }
                ]
            }
        });

        if (existingUser) {
            return res.status(409).json({ message: 'Email atau nama pengguna sudah terdaftar.' });
        }

        // 3. Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Buat User Baru di Tabel `users`
        const newUser = await User.create({
            username: username,
            email: email,
            password_hash: hashedPassword,
            role: role // Simpan role langsung di tabel users
        });

        // 5. Membuat JWT (dengan role langsung dari user object)
        // Permissions akan di-hardcode berdasarkan role untuk model RBAC yang disederhanakan ini
        let permissions = [];
        if (role === 'admin') {
            permissions = ['view_dashboard', 'manage_users', 'manage_roles', 'manage_permissions', 'view_logs', 'view_karyawan', 'view_pelanggan'];
        } else if (role === 'user') {
            permissions = ['view_dashboard', 'view_barang', 'create_order', 'view_own_orders'];
        }

        const token = jwt.sign(
            { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role, permissions: permissions }, // Perhatikan 'role' tunggal
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'Registrasi berhasil!',
            token,
            user: { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role, permissions: permissions }
        });

    } catch (error) {
        console.error('Registration error details:', error);
        // Tangani error unik dari database (misalnya duplikasi)
        if (error.name === 'SequelizeUniqueConstraintError') {
             return res.status(409).json({ message: 'Email atau nama pengguna sudah terdaftar.' });
        }
        res.status(500).json({ message: 'Server error saat registrasi. Mohon coba lagi.' });
    }
};

// --- Fungsi Login ---
const login = async (req, res) => {
    const { identifier, password } = req.body; // 'identifier' bisa username atau email

    try {
        let user = null;

        // Coba cari user berdasarkan email
        const isEmail = /\S+@\S+\.\S+/.test(identifier);
        if (isEmail) {
            user = await User.findOne({ where: { email: identifier } });
        }

        // Jika tidak ditemukan sebagai email, coba cari sebagai username
        if (!user) {
            user = await User.findOne({ where: { username: identifier } });
        }

        if (!user) {
            return res.status(401).json({ message: 'Nama Pengguna/Email atau password salah.' });
        }

        // Bandingkan password yang diinput dengan hash yang tersimpan
        const isMatch = await bcrypt.compare(password, user.password_hash); // Menggunakan password_hash
        if (!isMatch) {
            return res.status(401).json({ message: 'Nama Pengguna/Email atau password salah.' });
        }

        // Dapatkan role dan permissions
        // Permissions akan di-hardcode berdasarkan role
        let permissions = [];
        if (user.role === 'admin') {
            permissions = ['view_dashboard', 'manage_users', 'manage_roles', 'manage_permissions', 'view_logs', 'view_karyawan', 'view_pelanggan'];
        } else if (user.role === 'user') {
            permissions = ['view_dashboard', 'view_barang', 'create_order', 'view_own_orders'];
        }

        // Buat JWT
        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email, role: user.role, permissions: permissions }, // Perhatikan 'role' tunggal
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role, permissions: permissions } });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error saat login.' });
    }
};

module.exports = {
    login,
    register
};