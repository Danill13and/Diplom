const { DataTypes, Sequelize } = require('sequelize')
<<<<<<< HEAD
const User = require('./userDB')
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

const Order = sequelize.define("Order",{
    inVoiceId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    success :{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    orderData:{
        type: DataTypes.JSON,
        allowNull: false,
<<<<<<< HEAD
    },
    user:{
        type: DataTypes.JSON,
        allowNull: false
    },
    prod:{
        type: DataTypes.JSON,
        allowNull: false
    },
    basket:{
        type: DataTypes.JSON,
        allowNull: false
=======
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
    }
})

sequelize.authenticate()
// sequelize.sync()

module.exports = Order