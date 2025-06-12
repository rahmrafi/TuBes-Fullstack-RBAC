require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const { User } = require('./models'); // Hanya perlu import User
// Opsional: Jika Anda ingin mempertahankan tabel 'roles' untuk seeding
// const { Role } = require('./models');

const app = express();
const PORT = process.env.PORT || 2526;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Sinkronisasi Database
sequelize.sync({ alter: true }) // Gunakan { alter: true } untuk mempertahankan data yang ada
    .then(async () => {
        console.log('Database synced for User model.');
        // Opsional: Seed roles jika Anda mempertahankan tabel 'roles'
        // const existingAdminRole = await Role.findOne({ where: { name: 'admin' } });
        // if (!existingAdminRole) {
        //     await Role.create({ name: 'admin', description: 'Administrator' });
        //     console.log('Admin role seeded.');
        // }
        // const existingUserRole = await Role.findOne({ where: { name: 'user' } });
        // if (!existingUserRole) {
        //     await Role.create({ name: 'user', description: 'Standard User' });
        //     console.log('User role seeded.');
        // }

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to sync database:', err);
    });