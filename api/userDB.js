const { DataTypes, Sequelize } = require('sequelize')

const sequelize = new Sequelize('diplomdatabase', 'postgres', 'postgres', {
    host: 'localhost',
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
      allowNull: true
    }
  })

  sequelize.authenticate()
  // sequelize.sync()

  module.exports = User