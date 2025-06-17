require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes')
const { User } = require('./models');


const app = express();
const PORT = process.env.PORT || 2526;

// Middleware //
app.use(cors());
app.use(express.json());

// Routes //
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Sinkronisasi Database //
sequelize.sync({ alter: true })
    .then(async () => {
        console.log('Database synced for User model.');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to sync database:', err);
    });