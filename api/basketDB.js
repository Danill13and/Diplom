const { DataTypes, Sequelize } = require('sequelize')
const User = require("./userDB")
const Product = require("./ProductDB")

const sequelize = new Sequelize('diplomdatabase', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
})

const Basket = sequelize.define("Basket",{
    userID:{
        type:DataTypes.STRING,
        allowNull: true
    },
    productID:{
        type:DataTypes.STRING,
        allowNull: true
    },
    count:{
        type:DataTypes.STRING,
        allowNull: true
    }
})

User.belongsToMany(Product, { through: Basket, onDelete: "CASCADE", onUpdate: "CASCADE" });
Product.belongsToMany(User, { through: Basket, onDelete: "CASCADE", onUpdate: "CASCADE" });

// Basket.hasMany(User, {ondelete: "CASCADE"})
// User.belongsTo(Basket, {ondelete: "CASCADE", through: Basket})
// Basket.hasMany(Product, {ondelete: "CASCADE"})
// Product.belongsTo(Basket, {ondelete: "CASCADE", through: Basket})

sequelize.authenticate()
// sequelize.sync()

module.exports = Basket