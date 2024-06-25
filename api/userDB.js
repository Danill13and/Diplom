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
<<<<<<< HEAD
      allowNull: true,
      defaultValue:null
    },
    phoneNumber:{
      type:DataTypes.STRING,
=======
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
      allowNull: true
    }
  })

  sequelize.authenticate()
  // sequelize.sync()

  module.exports = User