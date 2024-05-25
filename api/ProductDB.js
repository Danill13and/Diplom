const { DataTypes, Sequelize } = require('sequelize')

const sequelize = new Sequelize('diplomdatabase', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'sqlite',
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
sequelize.sync()

module.exports = Product