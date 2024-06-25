const { DataTypes, Sequelize } = require('sequelize')
<<<<<<< HEAD
require('dotenv').config()

const DataBaseUrl = process.env.DataBaseUrl
const sequelize = new Sequelize(DataBaseUrl, {
=======

const sequelize = new Sequelize('diplomdatabase', 'postgres', 'postgres', {
  host: 'localhost',
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
  dialect: 'postgres',
})

const Category = sequelize.define("Category",{
    name:{
        type:DataTypes.STRING,
        unique: true,
        allowNull: true
    }
})

sequelize.authenticate()
// sequelize.sync()

module.exports = Category