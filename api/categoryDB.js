const { DataTypes, Sequelize } = require('sequelize')

const sequelize = new Sequelize('diplomdatabase', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'sqlite',
})

const Category = sequelize.define("Product",{
    name:{
        type:DataTypes.STRING,
        unique: true
    }
})

sequelize.authenticate()
sequelize.sync()

export default Category