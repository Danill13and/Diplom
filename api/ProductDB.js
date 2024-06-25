const { DataTypes, Sequelize } = require('sequelize')
<<<<<<< HEAD
require('dotenv').config()

const DataBaseUrl = process.env.DataBaseUrl
const sequelize = new Sequelize(DataBaseUrl, {
    dialect: 'postgres',
  })
=======

const sequelize = new Sequelize('diplomdatabase', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
})
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9

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