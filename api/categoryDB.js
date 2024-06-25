const { DataTypes, Sequelize } = require('sequelize')
require('dotenv').config()

const DataBaseUrl = process.env.DataBaseUrl
const sequelize = new Sequelize(DataBaseUrl, {
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