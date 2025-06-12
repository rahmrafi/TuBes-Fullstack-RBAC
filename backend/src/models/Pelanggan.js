const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pelanggan = sequelize.define('Pelanggan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nama_pelanggan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alamat_pelanggan: {
        type: DataTypes.STRING,
        allowNull: true
    },
    feedback: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'pelanggan',
    timestamps: false
});

module.exports = Pelanggan;