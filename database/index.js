const { Sequelize } = require('sequelize');

// Setup Sequelize
const sequelize = new Sequelize('biodata-crud', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// Test database connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize;
