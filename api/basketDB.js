const { DataTypes, Sequelize } = require('sequelize')

const sequelize = new Sequelize('diplomdatabase', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
})

const Basket = sequelize.define("Basket",{
    apiKey:{
        type:DataTypes.STRING,
        allowNull: true
    },
    basket:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true
    }
})

sequelize.authenticate()
// sequelize.sync()

module.exports = Basket