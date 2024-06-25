const { DataTypes, Sequelize } = require('sequelize')
require('dotenv').config()

const DataBaseUrl = process.env.DataBaseUrl
const sequelize = new Sequelize(DataBaseUrl, {
  dialect: 'postgres',
})
  
  const User = sequelize.define("User", {
    name:{
        type:DataTypes.STRING,
        allowNull: true
    },
    surName:{
        type:DataTypes.STRING,
        allowNull: true
    },
    password:{
        type:DataTypes.STRING,
        allowNull: true
    },
    apikey:{
      type:DataTypes.STRING,
      allowNull: true
    },
    isStaff:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    history:{
      type:DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
      defaultValue:null
    },
    phoneNumber:{
      type:DataTypes.STRING,
      allowNull: true
    }
  })

  sequelize.authenticate()
  // sequelize.sync()

  module.exports = User