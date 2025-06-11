require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 2526;

const corsOptions = {
    origin: 'http://localhost:2728',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

db.authenticate()
    .then(() => console.log('Terkoneksi ke database!'))
    .catch(err => console.log('Tidak dapat terhubung ke database :' + err));

db.sync({ force: false})
    .then(() => console.log('Database sudah disinkronisasi!'))
    .catch(err => console.error('Gagal menyinkronisasi database :', err));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('API sedang berjalan...');
});

app.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
});