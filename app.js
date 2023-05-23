const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// Konfigurasi koneksi database
const sequelize = new Sequelize('biodata-crud', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

// Definisikan model Biodata
const Biodata = sequelize.define('Biodata', {
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tempat_lahir: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tanggal_lahir: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

// Inisialisasi ExpressJS
const app = express();
app.use(express.json());

// Endpoint Create (POST /biodata)
app.post('/biodata', async (req, res) => {
    try {
        const biodata = await Biodata.create(req.body);
        res.json(biodata);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoint Read All (GET /biodata)
app.get('/biodata', async (req, res) => {
    try {
        const biodataList = await Biodata.findAll();
        res.json(biodataList);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoint Read One (GET /biodata/:id)
app.get('/biodata/:id', async (req, res) => {
    try {
        const biodata = await Biodata.findByPk(req.params.id);
        if (biodata) {
            res.json(biodata);
        } else {
            res.status(404).json({ error: 'Biodata not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoint Update (PUT /biodata/:id)
app.put('/biodata/:id', async (req, res) => {
    try {
        const biodata = await Biodata.findByPk(req.params.id);
        if (biodata) {
            await biodata.update(req.body);
            res.json(biodata);
        } else {
            res.status(404).json({ error: 'Biodata not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoint Delete (DELETE /biodata/:id)
app.delete('/biodata/:id', async (req, res) => {
    try {
        const biodata = await Biodata.findByPk(req.params.id);
        if (biodata) {
            await biodata.destroy();
            res.json({ message: 'Biodata deleted' });
        } else {
            res.status(404).json({ error: 'Biodata not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Sinkronisasi model dengan database dan jalankan server
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});