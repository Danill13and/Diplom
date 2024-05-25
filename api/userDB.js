const { DataTypes, Sequelize } = require('sequelize')

const sequelize = new Sequelize('diplomdatabase', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'sqlite',
  })
  
  const User = sequelize.define("User", {
    name:{
        type:DataTypes.STRING
    },
    surName:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },

  })

  sequelize.authenticate()
  sequelize.sync()

  export default User