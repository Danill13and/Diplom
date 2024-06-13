const { DataTypes, Sequelize } = require('sequelize')
const User = require("./userDB")
const Product = require("./ProductDB")

const sequelize = new Sequelize('diplomdatabase', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
})

const Basket = sequelize.define("Basket",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userID:{
        type:DataTypes.STRING,
        allowNull: true
    },
    productID:{
        type:DataTypes.STRING,
        allowNull: true
    },
    count:{
        type:DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
    },
    user_token:{
        type:DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
})

User.belongsToMany(Product, { through: Basket, onDelete: "CASCADE"});
Product.belongsToMany(User, { through: Basket, onDelete: "CASCADE"});

// Basket.hasMany(User, {ondelete: "CASCADE"})
// User.belongsTo(Basket, {ondelete: "CASCADE", through: Basket})
// Basket.hasMany(Product, {ondelete: "CASCADE"})
// Product.belongsTo(Basket, {ondelete: "CASCADE", through: Basket})

sequelize.authenticate()
// sequelize.sync()

module.exports = Basket