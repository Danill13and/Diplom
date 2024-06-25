const { DataTypes, Sequelize } = require('sequelize')
require('dotenv').config()

const DataBaseUrl = process.env.DataBaseUrl
const sequelize = new Sequelize(DataBaseUrl, {
    dialect: 'postgres',
  })

const Product = sequelize.define("Product",{
    name:{
        type:DataTypes.STRING
    },
    price:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING
    },
    image:{
        type:DataTypes.STRING
    },
    ingredients:{
        type:DataTypes.STRING
    },
    category:{
        type:DataTypes.STRING
    }
})

sequelize.authenticate()
// sequelize.sync()

module.exports = Product