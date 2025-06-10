const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');

const Karyawan = sequelize.define('Karyawan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nomor_hp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        // enum: ['admin'] (Sequelize tidak memiliki enum seperti Mongoose secara langsung)
        // Anda bisa memvalidasi ini di controller atau di Sequelize Hooks
        allowNull: false
    }
}, {
    tableName: 'karyawan',
    timestamps: false
});

module.exports = Karyawan;