const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Biodata = sequelize.define('Biodata', {
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tempat_lahir: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tanggal_lahir: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Biodata.init(sequelize);

module.exports = Biodata;
