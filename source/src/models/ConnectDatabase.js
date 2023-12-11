const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('ProjectNodeJs', 'root', '1234', 
{
    host: "localhost",
    port: "3307",
    dialect: "mysql"
});

module.exports = sequelize