const { DataTypes, Sequelize } = require('sequelize')

const sequelize = new Sequelize('diplomdatabase', 'postgres', 'postgres', {
  host: 'localhost',
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